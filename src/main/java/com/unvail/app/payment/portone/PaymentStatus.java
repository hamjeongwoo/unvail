package com.unvail.app.payment.portone;

public enum PaymentStatus {
    PAID, READY, FAILED, CANCELLED,
    PARTIAL_CANCELLED, PAY_PENDING,
    VIRTUAL_ACCOUNT_ISSUED, UNKNOWN
}
