package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unvail.app.comm.ContextUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import com.unvail.app.users.UnveilUser;
import io.portone.sdk.server.payment.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

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
            throw new BusinessException(ErrorCode.ERROR_PG_TICKET);
        } catch (ExecutionException | JsonProcessingException | InterruptedException e) {
            portOneService.cancelRequest(param.getPaymentId(), "결제 요청 처리 중 서버 오류[01]");
            modelAndView.setViewName("redirect:/charge?error=ok");
        } catch (BusinessException e){
            portOneService.cancelRequest(param.getPaymentId(), "결제 요청 처리 중 서버 오류[02]");
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + e.getErrorCode().getMessage());
        } catch (Exception e) {
            portOneService.cancelRequest(param.getPaymentId(), "결제 요청 처리 중 서버 오류[03]");
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + e.getMessage());
        }

        return modelAndView;
    }
}
