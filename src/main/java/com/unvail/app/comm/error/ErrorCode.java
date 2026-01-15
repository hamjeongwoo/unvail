package com.unvail.app.comm.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // COMMON
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "C001", "잘못된 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C999", "서버 오류가 발생했습니다."),

    // AUTH
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "A001", "인증이 필요합니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "A002", "접근 권한이 없습니다."),

    // BUSINESS
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "사용자를 찾을 수 없습니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "U002", "이미 존재하는 이메일입니다."),
    
    PROMPT_ERROR01(HttpStatus.INTERNAL_SERVER_ERROR, "P001", "프롬프트를 구성중에 문제가 발생하였습니다."),
    PROMPT_ERROR02(HttpStatus.INTERNAL_SERVER_ERROR, "P002", "질문 유형에 대한 사전 정의된 내용이 존재 하지 않습니다."),

    NOT_FOUND_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "I001", "이메일 정보가 없어 로그인할 수 없습니다.");





    private final HttpStatus status;
    private final String code;
    private final String message;
}
