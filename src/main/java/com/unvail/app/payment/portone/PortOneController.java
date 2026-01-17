package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.json.Json;
import com.unvail.app.comm.ContextUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import com.unvail.app.users.UnveilUser;
import io.portone.sdk.server.payment.Payment;
import io.portone.sdk.server.payment.PaymentWebhookRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

    private final PortOneService portOneService;

    @GetMapping("/{provider}/complete")
    public ModelAndView paymentComplete(PayRequestDto param, @PathVariable String provider) {
        log.debug("provider= {}", provider);

        ModelAndView modelAndView = new ModelAndView();

        if(param.getCode() != null){
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + param.getMessage());
            return modelAndView;
        }

        try {
            portOneService.ticketPucharse(param.getPaymentId(), PgTypeEnum.KAKAO);
            modelAndView.setViewName("redirect:/charge?success=ok");
        } catch (ExecutionException | JsonProcessingException | InterruptedException e) {
            portOneService.cancelRequest(param.getPaymentId(), "결제 요청 처리 중 서버 오류[01]");
            modelAndView.setViewName("redirect:/charge?error=ok");
        } catch (BusinessException e){
            portOneService.cancelRequest(param.getPaymentId(), "결제 요청 처리 중 서버 오류[02]");
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + URLEncoder.encode(e.getErrorCode().getMessage(), StandardCharsets.UTF_8));
        } catch (Exception e) {
            portOneService.cancelRequest(param.getPaymentId(), "결제 요청 처리 중 서버 오류[03]");
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + e.getMessage());
        }

        return modelAndView;
    }

    @PostMapping("/{provider}/complete/webhook")
    public ResponseEntity<Void> paymentCompleteWebhook(
            @RequestBody String rawBody,
            @RequestHeader Map<String, String> headers
    ) {
        log.debug("raw webhook body = {}", rawBody);

        // 1. 시그니처 검증
        // 2. JSON 파싱
        // 3. 비즈니스 처리

        return ResponseEntity.ok().build();
    }
}
