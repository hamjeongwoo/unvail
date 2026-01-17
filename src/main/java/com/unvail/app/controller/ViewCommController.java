package com.unvail.app.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
public class ViewCommController {

    private final static String NOT_FOUND_PAGE = "error/404";
    private final static int MAX_PATH_LENGTH = 100; //view를 못찾을 경우 uri가 누적으로 쌓이면서 무한 루프에 빠짐을 방지 하기위해 추가

    private final ViewCommService viewCommService;


    @GetMapping({"/", "/main"})
    public String main(Model model) {
        viewCommService.postLoginHandler(model);
        return "main";
    }

    @GetMapping("/pages/**")
    public String commRoute(HttpServletRequest request
                                , Model model){
        viewCommService.postLoginHandler(model);
        String uri = request.getRequestURI();
        String viewPath = uri.substring(7);

        if(viewPath.contains("..") || viewPath.length() >= MAX_PATH_LENGTH){ //보안 필터링
            return NOT_FOUND_PAGE;
        }

        return viewPath;
    }

    @GetMapping("/mypage")
    public String mypage(Model model) {
        viewCommService.postLoginHandler(model);
        return "auth/my-page";
    }

    @GetMapping("/charge")
    public String charge(Model model) {
        viewCommService.postLoginHandler(model);
        model.addAttribute("isCallback", "");
        return "auth/charge";
    }
}
