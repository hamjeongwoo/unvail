package com.unvail.app.saju;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequestMapping("/inbound/external/saju")
@RestController
public class SajuController {

    @PostMapping("/analysis/callback")
    public void sajuTest(@RequestBody Map<String, Object> params) {
        log.debug("sajuTest = {}", params);
    }

    @GetMapping("/analysis/callback")
    public void getTest() {
        log.debug("getTest = {}");
    }
}
