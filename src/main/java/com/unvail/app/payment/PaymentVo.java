package com.unvail.app.payment;

import com.unvail.app.comm.model.Audit;
import com.unvail.app.payment.portone.PaymentStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.Instant;

@Getter
@ToString
@Builder
public class PaymentVo extends Audit {

    private final String email;

    /** 포트원 결제 ID */
    private final String paymentId;

    /** 포트원 transactionId (PG 트랜잭션 기준) */
    private final String transactionId;

    /** 상점 / 고객사 */
    private final String merchantId;
    private final String storeId;

    /** 결제 상태 (우리 도메인 기준) */
    private final PaymentStatus status;

    /** 결제 수단 (KAKAOPAY, CARD 등) */
    private final String paymentProvider;

    /** 주문명 */
    private final String orderName;

    /** 금액 정보 */
    private final long amountTotal;
    private final Long amountVat;
    private final Long amountSupply;

    /** 통화 */
    private final String currency;

    /** 내부 사용자 식별자 */
    private final String customerId;

    /** 결제 시각 */
    private final Instant requestedAt;
    private final Instant paidAt;

    /** PG 정보 */
    private final String pgTxId;
    private final String receiptUrl;

    /** PG 원본 응답 (JSON 그대로) */
    private final String pgResponse;
}