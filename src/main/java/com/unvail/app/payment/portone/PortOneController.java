package com.unvail.app.payment.portone;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unvail.app.comm.ContextUtils;
import com.unvail.app.comm.error.BusinessException;
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
        UnveilUser user = ContextUtils.getUnveilUser().get();
        log.debug("provider= {} param= {} user= {}", provider, param, user);

        ModelAndView modelAndView = new ModelAndView();
        log.debug("payment_id = {}, code = {}", param.getPaymentId(),  param.getCode());

        if(param.getCode() != null){
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + param.getMessage());
            return modelAndView;
        }

        try {
            portOneService.ticketPucharse(param.getPaymentId(), PgTypeEnum.KAKAO);
            modelAndView.setViewName("redirect:/charge?success=ok");
        } catch (ExecutionException | JsonProcessingException | InterruptedException e) {
            modelAndView.setViewName("redirect:/charge?error=ok");
        } catch (BusinessException e){
            modelAndView.setViewName("redirect:/charge?error=ok&message=" + e.getErrorCode().getMessage());
        }



        return modelAndView;
    }
}
