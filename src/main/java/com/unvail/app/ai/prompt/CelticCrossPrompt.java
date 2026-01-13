package com.unvail.app.ai.prompt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.unvail.app.comm.CommUtils;
import com.unvail.app.comm.error.BusinessException;
import com.unvail.app.comm.error.ErrorCode;

public class CelticCrossPrompt implements PromptStrategy<TarotRequestDto>{

    private int point = 900;

    String base= """
            당신은 30년 경력의 전문 타로 리더입니다.
            원카드 타로 리딩을 제공하며, 신비롭고 통찰력 있는 해석을 제공합니다.
            답변은 친근하면서도 진지한 톤으로 작성하세요.
            
            선택된 카드:
                1. 현재 상황: %s
                2. 장애물: %s
                3. 의식적 목표: %s
                4. 무의식적 영향: %s
                5. 과거: %s
                6. 가까운 미래: %s
                7. 질문자의 태도: %s
                8. 주변 영향: %s
                9. 희망과 두려움: %s
                10. 최종 결과: %s
             
            질문자의 고민: 
            %s
            인생 전반 종합 운세<br>가장 상세하고 깊이 있는 리딩을 원합니다.
            
            다음 형식으로 구조화된 답변을 제공하세요:
            1. 핵심 상황 분석 (1-3번 카드 중심, 3-4문장)
            2. 과거와 미래의 흐름 (4-6번 카드 중심, 3-4문장)
            3. 내면과 외부 환경 (7-9번 카드 중심, 3-4문장)
            4. 최종 결과와 조언 (10번 카드 중심, 3-4문장)
            전체 길이는 900-1000자 정도로 작성해주세요.
            
            응답구조: 아래 패턴으로
            <div class="result__section">
                <h3 class="result__section-title">🃏 핵심 상황 분석</h3>
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
