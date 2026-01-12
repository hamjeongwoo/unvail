package com.unvail.app.users;

import com.unvail.app.oauth.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersMapper usersMapper;

    public UnveilUser upsertOAuthUser(OAuth2UserInfo oAuth2UserInfo){
        usersMapper.upsertUserInfo(UnveilUser
                .builder()
                .email(oAuth2UserInfo.getEmail())
                .oauthType(oAuth2UserInfo.getOauthType().name())
                .authId(oAuth2UserInfo.getOauthId())
                .name(oAuth2UserInfo.getName())
                .build());
        return usersMapper.selectUsersByEmail(oAuth2UserInfo.getEmail());
    }

    public Integer selectUserCurPointByEmail(String email){
        return usersMapper.selectUserCurPointByEmail(email);
    }
}
