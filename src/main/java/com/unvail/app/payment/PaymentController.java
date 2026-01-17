package com.unvail.app.payment;

import com.unvail.app.comm.success.ApiResponse;
import com.unvail.app.comm.success.SuccessCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/payment")
    public ResponseEntity<ApiResponse<PaymentVo>> payment(HttpServletRequest request, @RequestParam String paymentId) {
        return ResponseEntity.ok(ApiResponse.success(
                        paymentService.selectByPaymentId(paymentId),
                        SuccessCode.OK,
                        request.getRequestURI()
                ));
    }
}
