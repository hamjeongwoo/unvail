package com.unvail.app.payment;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {

    int insertPayment(PaymentVo paymentVo);

    PaymentVo selectByPaymentId(String paymentVo);
}
