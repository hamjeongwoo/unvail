package com.unvail.app.aop;

import com.unvail.app.comm.model.Audit;
import lombok.extern.slf4j.Slf4j;
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
        if(methodName.contains("insert") || methodName.contains("update") || methodName.contains("upsert")){
            for (Object arg : args) {
                if (arg instanceof Audit audit) {
                    applyCommonFields(audit);
                }
            }
        }
        return joinPoint.proceed(args);
    }

    private void applyCommonFields(Audit audit) {
        LocalDateTime now = LocalDateTime.now();
        String loginUserId = getLoginUserId(); // SecurityContext에서 꺼내기
        audit.setSessionId(loginUserId);
    }

    private String getLoginUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : "SYSTEM";
    }
}