package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.portone.sdk.server.payment.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.concurrent.ExecutionException;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
@Controller
public class PortOneController {

    private final PortOneClient portOneClient;
    private final ObjectMapper objectMapper;

    @GetMapping("/kakao/complete")
    public ModelAndView paymentComplete(PayRequestDto param){
        ModelAndView modelAndView = new ModelAndView();
        log.debug("payment_id = {}, code = {}", param.getPaymentId(),  param.getCode());

        if(param.getCode() != null){
            modelAndView.setViewName("/auth/charge?error=ok&message=" + param.getMessage());
        }

        try {
            Payment payment = portOneClient.getKakaoPayment(param.getPaymentId());
            modelAndView.setViewName("/auth/charge?success=ok");
            if(log.isDebugEnabled()){
                log.debug(objectMapper.writeValueAsString(payment));
            }
        } catch (ExecutionException | InterruptedException e) {
            modelAndView.setViewName("/auth/charge?error=ok");
        } catch (JsonProcessingException e) {
            modelAndView.setViewName("/auth/charge?error=ok");
            throw new RuntimeException(e);
        }

        return modelAndView;
    }
}
