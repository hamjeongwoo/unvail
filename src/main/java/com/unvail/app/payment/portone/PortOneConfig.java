package com.unvail.app.payment.portone;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "portone")
public class PortOneConfig {
    private String apiUrl;
    private String kakaoSecKey;
    private String storeId;
}
