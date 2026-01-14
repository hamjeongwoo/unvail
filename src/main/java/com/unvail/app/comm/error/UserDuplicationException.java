package com.unvail.app.comm.error;

import lombok.Getter;

@Getter
public class UserDuplicationException extends RuntimeException {

    private final ErrorCode errorCode;

    public UserDuplicationException() {
        super(ErrorCode.DUPLICATE_EMAIL.getMessage());
        this.errorCode = ErrorCode.DUPLICATE_EMAIL;
    }
}
