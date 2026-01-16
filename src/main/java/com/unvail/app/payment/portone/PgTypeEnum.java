package com.unvail.app.payment.portone;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public enum PgTypeEnum {
    KAKAO("kakao"), NAVER("naver"), TOSS("toss");

    private final String value;

    private static Map<String, PgTypeEnum> map = new HashMap<>();
    static {
        for (PgTypeEnum type : PgTypeEnum.values()) {
            map.put(type.value, type);
        }
    }

    public static PgTypeEnum from(String value) {
        return map.get(value);
    }
}
