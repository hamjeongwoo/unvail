package com.unvail.app.payment.portone;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PortOnePaymentWebhookRequest {

    @JsonProperty("tx_id")
    private String txId;

    @JsonProperty("payment_id")
    private String paymentId;

    private String status;
}
