package com.unvail.app.comm;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.PrintWriter;
import java.io.StringWriter;

public class CommUtils {
    public static ObjectMapper nonnullMapper = new ObjectMapper();
    static {
        nonnullMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    public static String getStackTraceAsString(Throwable throwable) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        throwable.printStackTrace(pw);
        return sw.toString(); // Returns the stack trace as a string
    }
}
