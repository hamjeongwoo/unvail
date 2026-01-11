package com.unvail.app.oauth.strategy;

import com.unvail.app.oauth.OAuth2UserInfo;
import com.unvail.app.oauth.OauthType;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface OAuth2Strategy {
    OauthType getOAuth2ProviderType();

    OAuth2UserInfo getUserInfo(OAuth2User user);

    // boolean unlinkOAuth2Account();

    default void isOauthIdExist(String oauthId) {
        if (null == oauthId) {
            throw new OAuth2AuthenticationException("oauthId does not exist");
        }
    }
}
