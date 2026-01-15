package com.unvail.app.oauth;

public final class OAuth2TokenContext {

    private static final ThreadLocal<String> ACCESS_TOKEN = new ThreadLocal<>();

    private OAuth2TokenContext() {}

    public static void set(String token) {
        ACCESS_TOKEN.set(token);
    }

    public static String get() {
        return ACCESS_TOKEN.get();
    }

    public static void clear() {
        ACCESS_TOKEN.remove();
    }
}
