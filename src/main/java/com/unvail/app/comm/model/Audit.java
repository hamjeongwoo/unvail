package com.unvail.app.comm.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
public abstract class Audit {

    private String sessionId;
    private String createAt;
    private String createBy;
    private String updateAt;
    private String updateBy;
}
