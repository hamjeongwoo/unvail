package com.unvail.app.payment.portone;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "portone")
public class PortOneProperties {
    private String apiUrl;
    private String storeId;

    private Kakao kakao;
    private Toss toss;

    @Getter
    @Setter
    public static class Kakao {
        private String secKey;
        private String channelId;
    }

    @Getter
    @Setter
    public static class Toss {
        private String secKey;
        private String clientKey;
        private String channelId;
    }
}
