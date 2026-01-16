package com.unvail.app.payment.portone;

import io.portone.sdk.server.payment.Payment;
import io.portone.sdk.server.payment.PaymentClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutionException;

@Component
@RequiredArgsConstructor
public class PortOneClient {

    private final PortOneConfig portOneConfig;

    public Payment getKakaoPayment(String paymentId) throws ExecutionException, InterruptedException {
        PaymentClient paymentClient = new PaymentClient(portOneConfig.getKakaoSecKey(), portOneConfig.getApiUrl(), portOneConfig.getStoreId());
        return paymentClient.getPayment(paymentId).get();
    }
}
