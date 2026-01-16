package com.unvail.app.payment;

import com.unvail.app.payment.portone.PaymentStatus;
import io.portone.sdk.server.payment.*;

public class PaymentUtils {

    /**
     * READY	⭕	임시
     * PAY_PENDING	⭕	상태 추적
     * PAID	⭕⭕	확정 매출
     * FAILED	❌	로그만
     * CANCELLED	⭕	환불 기록
     * PARTIAL_CANCELLED	⭕⭕	환불 테이블 필요
     * VIRTUAL_ACCOUNT_ISSUED	⭕	입금 대기
     * @param payment
     * @return
     */
    public static PaymentStatus mapStatus(Payment payment) {
        if (payment instanceof PaidPayment) return PaymentStatus.PAID;
        if (payment instanceof ReadyPayment) return PaymentStatus.READY;
        if (payment instanceof FailedPayment) return PaymentStatus.FAILED;
        if (payment instanceof CancelledPayment) return PaymentStatus.CANCELLED;
        if (payment instanceof PartialCancelledPayment) return PaymentStatus.PARTIAL_CANCELLED;
        if (payment instanceof PayPendingPayment) return PaymentStatus.PAY_PENDING;
        if (payment instanceof VirtualAccountIssuedPayment) return PaymentStatus.VIRTUAL_ACCOUNT_ISSUED;
        return PaymentStatus.UNKNOWN;
    }

    public static String extractPaymentMethod(PaymentMethod method) {

        if (!(method instanceof PaymentMethod.Recognized recognized)) {
            return "UNKNOWN";
        }

        if (method instanceof PaymentMethodEasyPay easyPay) {
            return easyPay.getProvider().getValue(); // KAKAOPAY
        }

        if (method instanceof PaymentMethodCard) {
            return "CARD";
        }

        if (method instanceof PaymentMethodVirtualAccount) {
            return "VIRTUAL_ACCOUNT";
        }

        if (method instanceof PaymentMethodTransfer) {
            return "TRANSFER";
        }

        if (method instanceof PaymentMethodMobile) {
            return "MOBILE";
        }

        if (method instanceof PaymentMethodConvenienceStore) {
            return "CONVENIENCE_STORE";
        }

        if (method instanceof PaymentMethodGiftCertificate) {
            return "GIFT_CERTIFICATE";
        }

        return "UNKNOWN";
    }
}
