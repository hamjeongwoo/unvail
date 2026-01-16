package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import com.unvail.app.payment.PaymentService;
import com.unvail.app.payment.PaymentUtils;
import com.unvail.app.payment.product.TicketEnum;
import io.portone.sdk.server.payment.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Slf4j
@RequiredArgsConstructor
@Service
public class PortOneService {

    private final PortOneClient portOneClient;
    private final ObjectMapper objectMapper;
    private final PaymentService paymentService;

    public void ticketPucharse(String paymentId, PgTypeEnum pgtype) throws ExecutionException, InterruptedException, JsonProcessingException {
        Payment payment = null;
        if(PgTypeEnum.KAKAO.equals(pgtype)){
            payment = portOneClient.getKakaoPayment(paymentId);
        }

        if(log.isDebugEnabled()){
            log.debug(objectMapper.writeValueAsString(payment));
        }

        if (payment instanceof Payment.Recognized recognized) {
            TicketEnum ticket = TicketEnum.getByAmount(recognized.getAmount().getTotal());
            if (ticket == null) throw new BusinessException(ErrorCode.ERROR_PG_TICKET);
            if(!PaymentStatus.PAID.equals(PaymentUtils.mapStatus(payment))) throw new BusinessException(ErrorCode.ERROR_PG_TICKET);

            int result = paymentService.insertPayment(payment);
            if(result == 0){
                throw new BusinessException(ErrorCode.ERROR_PG_RES_SAVE);
            }
        }else{
            throw new BusinessException(ErrorCode.ERROR_PG_RES);
        }
    }
}
