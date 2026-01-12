package com.unvail.app.ai;

import com.unvail.app.ai.prompt.Prompt;
import com.unvail.app.ai.prompt.TarotRequestDto;
import com.unvail.app.comm.success.ApiResponse;
import com.unvail.app.comm.success.SuccessCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/ai")
@RestController
public class AiController {

    private final AiChatService aiChatService;

    @PostMapping("/v1/tarot/prompt")
    public ResponseEntity<ApiResponse<String>> prompt(@RequestParam String type
            , @RequestBody TarotRequestDto requestDto
            , HttpServletRequest request) {
        return ResponseEntity
                .ok(ApiResponse.success(
                        aiChatService.tarotChat(type, requestDto),
                        SuccessCode.OK,
                        request.getRequestURI()
                ));
    }

}
