package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
@Controller
public class PortOneController {

    private final PortOneService portOneService;

    @GetMapping("/{provider}/complete")
    public String paymentComplete(PayRequestDto param, @PathVariable String provider, Model model) {
        log.debug("provider= {}", provider);
        model.addAttribute("isCallback", "OK");
        if(param.getCode() != null) {
            model.addAttribute("error", "OK");
            model.addAttribute("message", param.getMessage());
        }

        return "auth/charge";
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
                log.error(CommUtils.getStackTraceAsString(e));
                portOneService.cancelRequest(requestDto.getPaymentId(), "결제 요청 처리 중 서버 오류[01]", PgTypeEnum.from(provider));
            } catch (BusinessException e){
                log.error(CommUtils.getStackTraceAsString(e));
                portOneService.cancelRequest(requestDto.getPaymentId(), "결제 요청 처리 중 서버 오류[02]", PgTypeEnum.from(provider));
            } catch (Exception e) {
                log.error(CommUtils.getStackTraceAsString(e));
                portOneService.cancelRequest(requestDto.getPaymentId(), "결제 요청 처리 중 서버 오류[03]", PgTypeEnum.from(provider));
            }
        }

        return ResponseEntity.ok().build();
    }
}
