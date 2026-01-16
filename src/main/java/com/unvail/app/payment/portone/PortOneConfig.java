package com.unvail.app.payment.portone;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "portone")
public class PortOneConfig {
    private String apiUrl;
    private String kakaoSecKey;
    private String storeId;
}
