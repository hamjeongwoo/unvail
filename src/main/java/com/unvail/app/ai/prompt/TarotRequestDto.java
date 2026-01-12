package com.unvail.app.ai.prompt;

import lombok.Getter;

import java.util.List;

@Getter
public class TarotRequestDto {
    private String type;
    private List<TarotCard> cards;
    private String question;
}
