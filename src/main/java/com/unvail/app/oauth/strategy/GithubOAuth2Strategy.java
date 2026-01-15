package com.unvail.app.oauth.strategy;

import com.unvail.app.comm.error.ErrorCode;
import com.unvail.app.oauth.OAuth2TokenContext;
import com.unvail.app.oauth.OAuth2UserInfo;
import com.unvail.app.oauth.OauthType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class GithubOAuth2Strategy implements OAuth2Strategy {

    private final OAuth2AuthorizedClientService clientService;

    @Override
    public OauthType getOAuth2ProviderType() {

        return OauthType.GITHUB;
    }

    @Override
    public OAuth2UserInfo getUserInfo(OAuth2User user) {
        final Map<String, Object> attributes = user.getAttributes();
        final String oauthId = String.valueOf(attributes.get("id"));
        final String oauthName = String.valueOf(attributes.get("login"));
        String email = String.valueOf(attributes.get("email"));
        if(email == null || "null".equals(email)) {
            email = getEmailByGithub();
            if(email == null){
                throw new OAuth2AuthenticationException(ErrorCode.NOT_FOUND_EMAIL.getCode());
            }

        }

        return new OAuth2UserInfo(OauthType.GITHUB, oauthId, oauthName, email, "id");
    }

    private String getAccessToken() {
        String accessToken = OAuth2TokenContext.get();
        OAuth2TokenContext.clear();
        return accessToken;
    }

    private String getEmailByGithub() {
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List> response = restTemplate.exchange(
                "https://api.github.com/user/emails",
                HttpMethod.GET,
                entity,
                List.class
        );

        List<Map<String, Object>> emails = response.getBody();

        return emails.stream()
                .filter(e -> Boolean.TRUE.equals(e.get("primary")))
                .map(e -> (String) e.get("email"))
                .findFirst()
                .orElse(null);

    }

}
