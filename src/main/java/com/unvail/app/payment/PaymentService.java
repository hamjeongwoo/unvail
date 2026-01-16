package com.unvail.app.payment;

import com.unvail.app.payment.portone.PaymentStatus;
import io.portone.sdk.server.payment.PaidPayment;
import io.portone.sdk.server.payment.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentMapper paymentMapper;

    public int insertPayment(Payment payment){
        PaymentVo vo = from(payment);

        log.debug("insert paymentvo: {}", vo);

        return paymentMapper.insertPayment(vo);
    }

    public static PaymentVo from(Payment payment) {

        if (!(payment instanceof Payment.Recognized recognized)) {
            return PaymentVo.builder()
                    .status(PaymentStatus.UNKNOWN)
                    .build();
        }

        PaymentStatus status = PaymentUtils.mapStatus(payment);

        PaymentVo.PaymentVoBuilder builder = PaymentVo.builder()
                .paymentId(recognized.getId())
                .transactionId(recognized.getTransactionId())
                .merchantId(recognized.getMerchantId())
                .storeId(recognized.getStoreId())
                .status(status)
                .paymentProvider(PaymentUtils.extractPaymentMethod(recognized.getMethod()))
                .orderName(recognized.getOrderName())
                .amountTotal(recognized.getAmount().getTotal())
                .amountVat(recognized.getAmount().getVat())
                .amountSupply(recognized.getAmount().getSupply())
                .currency(recognized.getCurrency().getValue())
                .customerId(recognized.getCustomer().getId())
                .requestedAt(recognized.getRequestedAt());

        if (payment instanceof PaidPayment paid) {
            builder
                    .paidAt(paid.getPaidAt())
                    .pgTxId(paid.getPgTxId())
                    .receiptUrl(paid.getReceiptUrl())
                    .pgResponse(paid.getPgResponse());
        }

        return builder.build();
    }


}
