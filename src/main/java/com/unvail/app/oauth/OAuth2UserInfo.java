package com.unvail.app.oauth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OAuth2UserInfo {
    private final OauthType oauthType;
    private final String oauthId;
    private final String name;
    private final String email;
}
