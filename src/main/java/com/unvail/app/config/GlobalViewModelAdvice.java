package com.unvail.app.config;

import com.unvail.app.oauth.CustomOAuth2User;
import com.unvail.app.users.UnveilUser;
import com.unvail.app.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Optional;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalViewModelAdvice {

    @Value("${portone.store-id}")
    private String storeId;

    @Value("${portone.kakao.channel-id}")
    private String channelId;

    private final UserService userService;

    @ModelAttribute
    public void populateCommonModel(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth != null ? auth.getName() : "anonymousUser";

        boolean isLoggedIn = !"anonymousUser".equals(user);
        model.addAttribute("isLoggedIn", isLoggedIn);

        if (isLoggedIn && auth.getPrincipal() instanceof CustomOAuth2User oauthUser) {
            UnveilUser unveilUser = oauthUser.getUnveilUser();

            model.addAttribute("name", unveilUser.getName());
            model.addAttribute("email", unveilUser.getEmail());
            model.addAttribute("oauthType", unveilUser.getOauthType());
            model.addAttribute("curPoint",
                    Optional.ofNullable(
                            userService.selectUserCurPointByEmail(unveilUser.getEmail())
                    ).orElse(0)
            );
        } else {
            model.addAttribute("name", "");
            model.addAttribute("email", "");
            model.addAttribute("oauthType", "");
            model.addAttribute("curPoint", 0);
        }

        model.addAttribute("storeId", storeId);
        model.addAttribute("channelId", channelId);
    }
}
