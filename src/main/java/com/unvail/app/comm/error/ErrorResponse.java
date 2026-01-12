package com.unvail.app.comm.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private String code;
    private String message;
    private int status;
    private String path;
    private LocalDateTime timestamp;

    private List<FieldError> errors;

    @Getter
    @Builder
    public static class FieldError {
        private String field;
        private String message;
    }

    public static ErrorResponse of(ErrorCode errorCode, String path) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .status(errorCode.getStatus().value())
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
