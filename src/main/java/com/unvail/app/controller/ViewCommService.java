package com.unvail.app.controller;

import com.unvail.app.oauth.CustomOAuth2User;
import com.unvail.app.user.UnveilUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class ViewCommService {

    public void postLoginHandler(Model model){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        model.addAttribute("isLoggedIn", auth != null);
        if(auth == null) return;
        UnveilUser unveilUser = ((CustomOAuth2User) auth.getPrincipal()).getUnveilUser();
    }
}
