package com.unvail.app.ai;

import com.unvail.app.ai.prompt.Prompt;
import com.unvail.app.ai.prompt.PromptStrategy;
import com.unvail.app.ai.prompt.TarotRequestDto;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AiChatService {

    private final OpenAiChatModel openAiChatModel;

    public String tarotChat(String type, TarotRequestDto requestDto){
        PromptStrategy<TarotRequestDto> strategy = Prompt.Info.get(type).orElseThrow(() -> new BusinessException(ErrorCode.PROMPT_ERROR02));
        String prompt = strategy.<TarotRequestDto>getPrompt(requestDto);
        return openAiChatModel.call(prompt);
    }

}
