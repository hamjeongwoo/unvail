// 로딩 애니메이션 공통 모듈

var Loading = (function() {
    var loadingElement = null;
    
    // 로딩 HTML 생성
    function createLoadingElement() {
        var overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.id = 'loadingOverlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <h3 class="loading-title" id="loadingTitle">결과를 생성하고 있습니다</h3>
                <p class="loading-text" id="loadingText">잠시만 기다려주세요...</p>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    // 로딩 표시
    function show(options) {
        if (!loadingElement) {
            loadingElement = createLoadingElement();
        }
        
        // 옵션 설정
        if (options) {
            var titleElement = document.getElementById('loadingTitle');
            var textElement = document.getElementById('loadingText');
            
            if (options.title && titleElement) {
                titleElement.textContent = options.title;
            }
            if (options.text && textElement) {
                textElement.textContent = options.text;
            }
        }
        
        loadingElement.style.display = 'flex';
    }
    
    // 로딩 숨김
    function hide() {
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    
    // 자동 숨김 (시간 지정)
    function showTimed(options, duration) {
        show(options);
        setTimeout(function() {
            hide();
        }, duration);
    }
    
    return {
        show: show,
        hide: hide,
        showTimed: showTimed
    };
})();
