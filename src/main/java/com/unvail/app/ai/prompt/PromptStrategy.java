package com.unvail.app.ai.prompt;

public interface PromptStrategy<T> {

    public String getPrompt(T prompt);
    public int getPoint();
}
