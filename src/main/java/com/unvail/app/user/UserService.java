package com.unvail.app.user;

import com.unvail.app.oauth.OAuth2UserInfo;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public UnveilUser upsertOAuthUser(OAuth2UserInfo oAuth2UserInfo){
        return new UnveilUser();
    }
}
