package com.unvail.app.payment.portone;

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

    private final PortOneConfig portOneConfig;

    public Payment getKakaoPayment(String paymentId) throws ExecutionException, InterruptedException {
        PaymentClient paymentClient = new PaymentClient(portOneConfig.getKakaoSecKey(), portOneConfig.getApiUrl(), portOneConfig.getStoreId());
        return paymentClient.getPayment(paymentId).get();
    }

    public void cancelPayment(String paymentId, String cancelRaeson) throws ExecutionException, InterruptedException {
        log.debug("======취소요청 start, paymentId={}, cancelReson={}", paymentId, cancelRaeson);
        PaymentClient paymentClient = new PaymentClient(portOneConfig.getKakaoSecKey(), portOneConfig.getApiUrl(), portOneConfig.getStoreId());
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
        ).get();
        log.debug("======취소요청 end");
    }
}
