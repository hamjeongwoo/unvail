package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.json.Json;
import com.unvail.app.comm.ContextUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import com.unvail.app.controller.ViewCommService;
import com.unvail.app.users.UnveilUser;
import io.portone.sdk.server.payment.Payment;
import io.portone.sdk.server.payment.PaymentWebhookRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
@Controller
public class PortOneController {

    private final ViewCommService viewCommService;
    private final PortOneService portOneService;

    @GetMapping("/{provider}/complete")
    public ModelAndView paymentComplete(PayRequestDto param, @PathVariable String provider, Model model) {
        viewCommService.postLoginHandler(model);
        log.debug("provider= {}", provider);

        ModelAndView modelAndView = new ModelAndView("auth/charge");
        modelAndView.addObject("isCallback", "OK");
        if(param.getCode() != null) {
            modelAndView.addObject("error", "OK");
            modelAndView.addObject("message", param.getMessage());
        }

        return modelAndView;
    }

    @PostMapping("/{provider}/complete/webhook")
    public ResponseEntity<Void> paymentCompleteWebhook(
            @RequestBody PortOnePaymentWebhookRequest requestDto
            , @PathVariable String provider) {
        log.debug("provider = {}, PortOnePaymentWebhookRequest = {}", provider, requestDto);

        if("Paid".equals(requestDto.getStatus())){
            try {
                portOneService.ticketPucharse(requestDto.getPaymentId(), PgTypeEnum.from(provider));
            } catch (ExecutionException | JsonProcessingException | InterruptedException e) {
                e.getStackTrace();
                portOneService.cancelRequest(requestDto.getPaymentId(), "결제 요청 처리 중 서버 오류[01]");
            } catch (BusinessException e){
                e.getStackTrace();
                portOneService.cancelRequest(requestDto.getPaymentId(), "결제 요청 처리 중 서버 오류[02]");
            } catch (Exception e) {
                e.getStackTrace();
                portOneService.cancelRequest(requestDto.getPaymentId(), "결제 요청 처리 중 서버 오류[03]");
            }
        }

        return ResponseEntity.ok().build();
    }
}
