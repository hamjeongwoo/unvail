package com.unvail.app.users;

import com.unvail.app.comm.model.Audit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class UnveilUser extends Audit {

    private String email;
    private String oauthType;
    private String authId;
    private String name;
    private String recentLogin;
    private String curPoint;
}
