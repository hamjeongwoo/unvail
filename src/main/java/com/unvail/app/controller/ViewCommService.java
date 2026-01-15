package com.unvail.app.controller;

import com.unvail.app.oauth.CustomOAuth2User;
import com.unvail.app.users.UnveilUser;
import com.unvail.app.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ViewCommService {

    private final UserService userService;

    public void postLoginHandler(Model model){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        model.addAttribute("isLoggedIn", !"anonymousUser".equals(user));
        String name = "";
        String email = "";
        int curPoint = 0;
        if(!"anonymousUser".equals(user)){
            UnveilUser unveilUser = ((CustomOAuth2User) auth.getPrincipal()).getUnveilUser();
            name = unveilUser.getName();
            email = unveilUser.getEmail();
            curPoint = Optional.ofNullable(userService.selectUserCurPointByEmail(unveilUser.getEmail()))
                    .orElse(0);
        }

        model.addAttribute("name", name);
        model.addAttribute("curPoint", curPoint);
        model.addAttribute("email", email);
    }
}
