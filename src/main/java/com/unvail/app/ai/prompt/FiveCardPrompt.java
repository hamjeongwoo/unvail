package com.unvail.app.ai.prompt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;
import lombok.Getter;

@Getter
public class FiveCardPrompt implements PromptStrategy<TarotRequestDto>{

    private int point = 800;

    String base= """
            당신은 30년 경력의 전문 타로 리더입니다.
            파이브카드 타로 리딩을 제공하며, 깊이 있고 구조적인 해석을 합니다.
            답변은 신비롭고 차분하지만 이해하기 쉬운 톤으로 작성하세요.
     
            선택된 카드:
            1번 카드 (현재 상태): %s
            2번 카드 (과거의 영향): %s
            3번 카드 (내면의 흐름): %s
            4번 카드 (다가오는 미래): %s
            5번 카드 (조언 및 결과): %s
     
            질문자의 고민:
            %s
     
            중요한 결정, 인생 전환점 심층 분석과 구체적 조언
     
            다음 형식으로 답변해주세요:
            1. 리딩 전체 요약 (3-4문장)
            2. 카드별 심층 해석
               - 현재 상태 (2-3문장)
               - 과거의 영향 (2-3문장)
               - 내면의 흐름 (2-3문장)
               - 다가오는 미래 (3-4문장)
               - 조언 및 결과 (3-4문장)
            3. 지금 가장 중요한 선택 포인트 (2-3문장)
            4. 핵심 메시지 (2-3문장)
     
            전체 길이는 700-800자 정도로 작성해주세요.
            
            응답구조: 아래 패턴으로
            <div class="result__section">
                <h3 class="result__section-title">🃏 현재 상태</h3>
                <p><strong>바보(The Fool)</strong> 카드는 ...</p>
                <p>당신은 지금 <strong>인생의 새로운 장</strong>을 ...</p>
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
                    , CommUtils.nonnullMapper.writeValueAsString(request.getCards().get(5))
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
