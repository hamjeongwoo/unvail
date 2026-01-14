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
            답변은 솔직하고 직설적이면서 위로와 공감도 잘 해주면서 선택과 바향성을
            중심으로 해석해 주세요
            
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
            
            다음 형식으로 구조화된 답변을 제공하세요:
            1. 현재 상황의 본질
            2. 장애물과 갈등 요인
            3. 의식 / 무의식
            4. 과거의 영향
            5. 가까운 미래
            6. 질문자의 태도
            7. 주변 사람들의 영향
            8. 희망과 두려움
            9. 최종 결과
            
            리딩의 깊이
             - 인생 상담 수준
             - “지금의 문제가 왜 반복되는가”를 설명
             - 장기 흐름과 성격 패턴까지 읽음
            전체 길이는 1200-1300자 정도로 작성해주세요.
            
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
