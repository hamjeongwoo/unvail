package com.unvail.app.oauth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/kakao")
@RestController
public class KakaoController {

    @GetMapping("/login-redirect/oauth")
    public String loginRedirect(@RequestParam(required = false) String error){
//        if("access_denied".equals(error)){
//            return "forward:/main";
//        }

        return "redirect:/main";
    }

}
