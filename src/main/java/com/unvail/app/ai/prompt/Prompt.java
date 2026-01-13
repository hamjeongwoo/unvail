package com.unvail.app.ai.prompt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toMap;


public class Prompt {

    @Getter
    @RequiredArgsConstructor
    public static enum Info {
        ONECARD("one-card", new OneCardPrompt()),
        THREECARD("three-card", new ThreeCardPrompt()),
        FOURCARD("four-card", new OneCardPrompt()),
        FIVECARD("five-card", new OneCardPrompt()),
        CELTICCARD("celtic-cross", new OneCardPrompt());

        private final String type;
        private final PromptStrategy strategy;

        public static Optional<PromptStrategy> get(String type) {
            return Optional.ofNullable(promptMap.get(type));
        }
    }

    private static final Map<String, PromptStrategy> promptMap = Stream.of(Prompt.Info.values()).collect(toMap(Info::getType, Info::getStrategy));

}
