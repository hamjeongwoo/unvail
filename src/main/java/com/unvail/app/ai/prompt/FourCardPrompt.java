package com.unvail.app.ai.prompt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import lombok.Getter;

@Getter
public class FourCardPrompt implements PromptStrategy<TarotRequestDto>{

    private int point = 700;

    String base= """
            당신은 30년 경력의 전문 타로 리더입니다.
            포카드 타로 리딩을 제공하며, 신비롭고 통찰력 있는 해석을 제공합니다.
            답변은 솔직하고 직설적이면서 위로와 공감도 잘 해주면서 선택과 바향성을
            중심으로 해석해 주세요
            
            선택된 카드:
            1번 카드 (현재 상황): %s
            2번 카드 (문제의 원인): %s
            3번 카드 (방해 요소): %s
            4번 카드 (조언과 해결책): %s
            
            질문자의 고민:
            %s
            
            다음 형식으로 답변해주세요:
            1. 전체 흐름 요약
            2. 카드별 해석
               - 현재 상황
               - 문제의 원인
               - 방해 요소
               - 조언과 해결책
            3. 실천 조언
            4. 핵심 메시지
            
            전체 길이는 800-900자 정도로 작성해주세요.
            
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
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(0))
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(1))
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(2))
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(3))
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
