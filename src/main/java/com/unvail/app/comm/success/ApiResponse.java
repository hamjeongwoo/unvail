package com.unvail.app.comm.success;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private boolean success;
    private String code;
    private String message;
    private int status;
    private String path;
    private LocalDateTime timestamp;

    private T data;

    public static <T> ApiResponse<T> success(
            T data,
            HttpStatus status,
            String path
    ) {
        return ApiResponse.<T>builder()
                .success(true)
                .code("S000")
                .message("SUCCESS")
                .status(status.value())
                .path(path)
                .timestamp(LocalDateTime.now())
                .data(data)
                .build();
    }

    public static ApiResponse<Void> success(
            HttpStatus status,
            String path
    ) {
        return success(null, status, path);
    }

    public static <T> ApiResponse<T> success(
            T data,
            SuccessCode successCode,
            String path
    ) {
        return ApiResponse.<T>builder()
                .success(true)
                .code(successCode.getCode())
                .message(successCode.getMessage())
                .status(successCode.getStatus().value())
                .path(path)
                .timestamp(LocalDateTime.now())
                .data(data)
                .build();
    }

    public static ApiResponse<Void> success(
            SuccessCode successCode,
            String path
    ) {
        return ApiResponse.<Void>builder()
                .success(true)
                .code(successCode.getCode())
                .message(successCode.getMessage())
                .status(successCode.getStatus().value())
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();
    }

}
