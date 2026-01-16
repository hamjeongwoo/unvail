package com.unvail.app.payment.portone;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PayRequestDto {
    private String paymentId;
    private String code;
    private String message;
    private String pgCode;
    private String pgMessage;
}
