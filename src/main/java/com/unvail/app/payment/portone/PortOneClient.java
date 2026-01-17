package com.unvail.app.payment.portone;

import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import io.portone.sdk.server.payment.Payment;
import io.portone.sdk.server.payment.PaymentClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutionException;

@Slf4j
@Component
@RequiredArgsConstructor
public class PortOneClient {

    private final PortOneProperties portOneConfig;

    public Payment getCommPayment(String paymentId, PgTypeEnum pgType) throws ExecutionException, InterruptedException {
        PaymentClient paymentClient = createPaymentClient(pgType);
        return paymentClient.getPayment(paymentId).get();
    }

    private PaymentClient createPaymentClient(PgTypeEnum pgType){
        return switch (pgType){
            case PgTypeEnum.KAKAO -> new PaymentClient(portOneConfig.getKakao().getSecKey(), portOneConfig.getApiUrl(), portOneConfig.getStoreId());
            case NAVER -> null;
            case TOSS -> null;
            default -> throw new BusinessException(ErrorCode.ERROR_PG_NOT_CONF);
        };
    }

    public void cancelPayment(String paymentId, String cancelRaeson, PgTypeEnum pgType) {
        log.debug("======취소요청 start, paymentId={}, cancelReson={}", paymentId, cancelRaeson);
        PaymentClient paymentClient = createPaymentClient(pgType);
        paymentClient.cancelPayment(
                paymentId
                , null
                , null
                , null
                , cancelRaeson
                , null
                , null
                , null
                , null
        ).join();
        log.debug("======취소요청 end");
    }
}
