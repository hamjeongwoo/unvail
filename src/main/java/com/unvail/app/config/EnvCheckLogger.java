package com.unvail.app.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EnvCheckLogger {

    private final Environment env;

    @EventListener(ApplicationReadyEvent.class)
    public void logEnv() {
        log.info("==== ENV CHECK START ====");
        log.info("spring.profiles.active = {}", env.getProperty("spring.profiles.active"));
//        log.info("spring.datasource.password = {}", env.getProperty("spring.datasource.password"));
//        log.info("KAKAO CLIENT ID = {}", env.getProperty("spring.security.oauth2.client.registration.kakao.client-id"));
//        log.info("KAKAO REDIRECT URI = {}", env.getProperty("spring.security.oauth2.client.registration.kakao.redirect-uri"));
        log.info("SERVER PORT = {}", env.getProperty("server.port"));
        log.info("==== ENV CHECK END ====");
    }
}