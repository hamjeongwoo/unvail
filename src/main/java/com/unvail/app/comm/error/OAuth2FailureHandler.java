package com.unvail.app.comm.error;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception) throws IOException {

        log.error("OAuth2 Login Failed", exception);

        String errorCode = "UNKNOWN";

        if (exception instanceof OAuth2AuthenticationException oauth2Ex) {
            errorCode = oauth2Ex.getError().getErrorCode();
        }

        response.sendRedirect("/pages/login?error=" + errorCode);
    }
}