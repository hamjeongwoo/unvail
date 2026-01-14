package com.unvail.app.ai.prompt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;

public class ThreeCardPrompt implements PromptStrategy<TarotRequestDto>{

    private int point = 700;

    String base= """
            당신은 30년 경력의 전문 타로 리더입니다.
            원카드 타로 리딩을 제공하며, 신비롭고 통찰력 있는 해석을 제공합니다.
            답변은 솔직하고 직설적이면서 위로와 공감도 잘 해주면서 선택과 바향성을
            중심으로 해석해 주세요
            
            선택된 카드:
             -첫번째카드: %s 
             -두번째카드: %s
             -세번째카드: %s
             
            질문자의 고민: 
            %s
            
            다음 형식으로 답변해주세요:
            질문의 맞게 리딩 하여 보여줄 형식을 선택해 주세요
            형식1. (과거 / 현재 / 미래 / 종합 조언)
            형식2. (나 / 상대방 / 관계 / 종합 조언)
            형식3. (문제 / 원인 / 결과 / 종합 조언)
            질문이 비어 있거나 맞는 형식이 없다면 형식1로 선택해 주세요
            전체 길이는 700-800자 정도로 작성해주세요.
            
            응답 구조: 아래 패턴으로
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
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(0))
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(1))
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(2))
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
