package com.unvail.app.payment.product;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;


@Getter
@RequiredArgsConstructor
public enum TicketEnum {
    BASIC("basic", "Basic 이용권", 900L),
    STANDARD("standard", "Standard 이용권", 1700L),
    PREMIUM("premium", "Premium 이용권", 2600L),
    ULTIMATE("ultimate", "Ultimate 이용권", 3500L);

    private final String id;
    private final String name;
    private final Long amount;

    private static final Map<String, TicketEnum> mapById = new HashMap<>();
    private static final Map<Long, TicketEnum> mapByAmount = new HashMap<>();
    static {
        for (TicketEnum e : TicketEnum.values()) {
            mapById.put(e.id, e);
            mapByAmount.put(e.amount, e);
        }
    }

    public static TicketEnum getById(String id) {
        return mapById.get(id);
    }

    public static TicketEnum getByAmount(Long amount) {
        return mapByAmount.get(amount);
    }
}
