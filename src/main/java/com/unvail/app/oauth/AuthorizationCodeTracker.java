package com.unvail.app.oauth;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class AuthorizationCodeTracker {
    private final Set<String> usedCodes = ConcurrentHashMap.newKeySet();

    public boolean isCodeUsed(String code) {
        return usedCodes.contains(code);
    }

    public void markCodeUsed(String code) {
        usedCodes.add(code);
    }
}