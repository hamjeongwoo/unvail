package com.unvail.app.oauth.service;

import com.unvail.app.comm.error.ErrorCode;
import com.unvail.app.comm.error.UserDuplicationException;
import com.unvail.app.oauth.CustomOAuth2User;
import com.unvail.app.oauth.OAuth2StrategyComposite;
import com.unvail.app.oauth.OAuth2UserInfo;
import com.unvail.app.oauth.OauthType;
import com.unvail.app.users.UnveilUser;
import com.unvail.app.users.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final OAuth2StrategyComposite oauth2StrategyComposite;
    private final UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        OAuth2UserInfo oauth2UserInfo = oauth2StrategyComposite
                .getOAuth2Strategy(getSocialProvider(userRequest))
                .getUserInfo(oauth2User);
        List<SimpleGrantedAuthority> authorities = getAuthorities(oauth2UserInfo);
        log.info("oauth2USerINfo: {} {}", oauth2UserInfo.getOauthId(), oauth2UserInfo.getName());

        UnveilUser selectUser = userService.selectUsersByEmail(oauth2UserInfo.getEmail());

        if(selectUser != null
                && !selectUser.getOauthType().toLowerCase().equals(userRequest.getClientRegistration().getRegistrationId())){ //다른 auth 타입의 동일 이메일이 있는경우 중복
            throw new OAuth2AuthenticationException(ErrorCode.DUPLICATE_EMAIL.getCode());
        }

        UnveilUser user = userService.upsertOAuthUser(oauth2UserInfo);
        return new CustomOAuth2User(authorities, oauth2User.getAttributes(), oauth2UserInfo.getAttributeKey(), user);
    }

    private OauthType getSocialProvider(OAuth2UserRequest userRequest) {
        return OauthType.ofType(userRequest.getClientRegistration().getRegistrationId());
    }

    private List<SimpleGrantedAuthority> getAuthorities(OAuth2UserInfo userInfo) {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
//        final User findUser = userRepository.findByOAuthIdAndOAuthType(userInfo.getOauthId(), userInfo.getOauthType());
//        if (findUser != null) {
//            if (!findUser.getName().equals(userInfo.getName())) {
//                throw new OAuth2AuthenticationException("oauth information not matched!");
//            }
//            // 로그인 ROLE_USER
//            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
//        }
//
//        return List.of(new SimpleGrantedAuthority("ROLE_GUEST"));
    }
}
