package com.unvail.app.users;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UsersMapper {

    public int upsertUserInfo(UnveilUser unveilUser);

    public UnveilUser selectUsersByEmail(String email);

    public Integer selectUserCurPointByEmail(String email);
}
