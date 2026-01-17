package com.unvail.app.comm;

import com.unvail.app.oauth.CustomOAuth2User;
import com.unvail.app.users.UnveilUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class ContextUtils {

    public static Optional<Authentication> getAuthentication() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication());
    }

    public static Optional<UnveilUser> getUnveilUser(){
        return getAuthentication()
                .filter(auth -> auth.getPrincipal() instanceof CustomOAuth2User)
                .map(auth -> (CustomOAuth2User) auth.getPrincipal())
                .map(CustomOAuth2User::getUnveilUser);
    }

    public static String getEmail(){
        return getUnveilUser()
                .map(UnveilUser::getEmail)
                .orElse(null);
    }
}
