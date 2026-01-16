package com.unvail.app.ai.prompt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import lombok.Getter;

@Getter
public class OneCardPrompt implements PromptStrategy<TarotRequestDto>{

    String base= """
            당신은 30년 경력의 전문 타로 리더입니다.
            원카드 타로 리딩을 제공하며, 신비롭고 통찰력 있는 해석을 제공합니다.
            답변은 솔직하고 직설적이면서 위로와 공감도 잘 해주면서 선택과 바향성을
            중심으로 해석해 주세요
            
            선택된 카드:
            %s
            
            질문자의 고민: 
            %s
            
            다음 형식으로 답변해주세요:
            자유형식
            전체 길이는 300-400자 정도로 작성해주세요.
            
            응답구조: 아래 패턴으로
            <div class="result__section">
                <h3 class="result__section-title">{알맞는 이모지}{소제목}</h3>
                <p>{내용, 중요한 부분은 <strong></strong> 처리} ...</p>
            </div>
            ...
            """;

    @Override
    public String getPrompt(TarotRequestDto request) {
        try{
            return String.format(base
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards())
                    , CommUtils.nonnullMapper.writeValueAsString(request.getQuestion()));
        }catch(JsonProcessingException e){
            e.printStackTrace();
            throw new BusinessException(ErrorCode.PROMPT_ERROR01);
        }
    }
}
