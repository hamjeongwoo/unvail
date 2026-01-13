package com.unvail.app.ai.prompt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import lombok.Getter;

@Getter
public class OneCardPrompt implements PromptStrategy<TarotRequestDto>{

    private int point = 500;

    String base= """
            당신은 30년 경력의 전문 타로 리더입니다.
            원카드 타로 리딩을 제공하며, 신비롭고 통찰력 있는 해석을 제공합니다.
            답변은 친근하면서도 진지한 톤으로 작성하세요.
            
            선택된 카드:
            %s
            
            질문자의 고민: 
            %s
            오늘의 운세, 간단한 조언 리딩을 원합니다.
            
            다음 형식으로 답변해주세요:
            1. 카드의 기본 의미 (1-2문장)
            2. 현재 상황 해석 (3-4문장)
            3. 조언과 방향성 (3-4문장)
            4. 핵심 메시지 (2-3문장)
            전체 길이는 500-600자 정도로 작성해주세요.
            
            응답구조: 아래 패턴으로
            <div class="result__section">
                <h3 class="result__section-title">🃏 카드의 의미</h3>
                <p><strong>바보(The Fool)</strong> 카드는 ...</p>
                <p>당신은 지금 <strong>인생의 새로운 장</strong>을 ...</p>
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

    @Override
    public int getPoint(){
        return point;
    }
}
