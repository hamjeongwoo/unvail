package com.unvail.app.comm;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CommUtils {
    public static ObjectMapper nonnullMapper = new ObjectMapper();
    static {
        nonnullMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }
}
