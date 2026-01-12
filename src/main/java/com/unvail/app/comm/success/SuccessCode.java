package com.unvail.app.comm.success;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode {

    OK(HttpStatus.OK, "S000", "요청이 성공했습니다."),
    CREATED(HttpStatus.CREATED, "S001", "정상적으로 생성되었습니다."),
    UPDATED(HttpStatus.OK, "S002", "정상적으로 수정되었습니다."),
    DELETED(HttpStatus.OK, "S003", "정상적으로 삭제되었습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}