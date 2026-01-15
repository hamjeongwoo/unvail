package com.unvail.app.oauth.strategy;

import com.unvail.app.oauth.OAuth2UserInfo;
import com.unvail.app.oauth.OauthType;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NaverOAuth2Strategy implements OAuth2Strategy {

    @Override
    public OauthType getOAuth2ProviderType() {

        return OauthType.NAVER;
    }

    @Override
    public OAuth2UserInfo getUserInfo(OAuth2User user) {
        final Map<String, Object> response = user.getAttributes();
        final Map<String, Object> attributes = (Map<String, Object>) response.get("response");
        final String oauthId = String.valueOf(attributes.get("id"));
        final String name = String.valueOf(attributes.get("name"));
        final String email = String.valueOf(attributes.get("email"));

        return new OAuth2UserInfo(OauthType.NAVER, oauthId, name, email, "response");
    }
}
