package com.unvail.app.config;

import com.unvail.app.comm.error.CustomAccessDeniedHandler;
import com.unvail.app.oauth.CustomAuthExceptionHandler;
import com.unvail.app.oauth.CustomOAuth2SuccessHandler;
import com.unvail.app.oauth.service.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    private final CustomAuthExceptionHandler customAuthExceptionHandler;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/css/**", "/js/**", "/favicon.ico", "/.well-known/appspecific/com.chrome.devtools.json").permitAll()
                .requestMatchers("/", "/main", "/pages/**").permitAll()
                .requestMatchers("/login/**", "/oauth2/**").permitAll()
                .requestMatchers("/api/**").hasRole("USER")
                .anyRequest().authenticated());
        http.oauth2Login(config -> config
                .successHandler(customOAuth2SuccessHandler)
                .failureHandler(customAuthExceptionHandler)
                .userInfoEndpoint(endpointConfig -> endpointConfig
                .userService(customOAuth2UserService))
            )
                .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(ex ->
                ex.accessDeniedHandler(customAccessDeniedHandler)
                .defaultAuthenticationEntryPointFor(
                        restAuthenticationEntryPoint,
                        new RequestMatcher() {
                            @Override
                            public boolean matches(HttpServletRequest request) {
                                return request.getRequestURI().startsWith("/api/");
                            }
                        }
                )
            );


        return http.build();
    }

}