package com.unvail.app.aop;

import com.unvail.app.comm.ContextUtils;
import com.unvail.app.comm.model.Audit;
import com.unvail.app.users.UnveilUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.manager.util.SessionUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@Slf4j
public class MapperArgumentAspect {

    @Around("execution(* com.unvail.app..*Mapper.*(..))")
    public Object setCommonFields(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
//        for (Object arg : args) {
//            if (arg instanceof Audit audit) {
//                applyCommonFields(audit);
//            }
//        }
        return joinPoint.proceed(args);
    }

    private void applyCommonFields(Audit audit) {
        LocalDateTime now = LocalDateTime.now();
        String loginUserId = getLoginUserId(); // SecurityContext에서 꺼내기
        audit.setSessionId(loginUserId);
    }

    private String getLoginUserId() {
        return ContextUtils.getUnveilUser()
                .map(UnveilUser::getEmail)
                .orElse("NO_SESSION_USER");
    }
}