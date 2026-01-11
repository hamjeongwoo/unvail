// 공통 유틸리티 함수들

// URL 파라미터에서 포인트 가져오기
function getPointFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var point = urlParams.get('point');
    return point ? parseInt(point) : 100; // 기본값 100
}

// URL 파라미터에서 사용자 정보 가져오기
function getUserFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var userEmail = urlParams.get('user');
    return userEmail ? decodeURIComponent(userEmail) : null;
}

// 현재 사용자 정보 가져오기
function getCurrentUser() {
    return getUserFromURL();
}

// 사용자 정보와 포인트를 포함하여 페이지 이동
function navigateWithUserAndPoint(url, point, userEmail) {
    var params = '?unvail=lec';
    if (userEmail) {
        params += '&user=' + encodeURIComponent(userEmail);
    }
    window.location.href = url + params;
}

// 사용자 UI 업데이트
function updateUserUI() {
    var userEmail = getCurrentUser();
    var loginBtn = document.getElementById('loginBtn');
    var userInfo = document.getElementById('userInfo');
    var userEmailEl = document.getElementById('userEmail');
    
    if (userEmail) {
        // 로그인 상태
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (userEmailEl) userEmailEl.textContent = userEmail;
    } else {
        // 비로그인 상태
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// 현재 포인트 가져오기
function getCurrentPoint() {
    return getPointFromURL();
}

// 포인트와 함께 페이지 이동
function navigateWithPoint(url, point) {
    var userEmail = getCurrentUser();
    navigateWithUserAndPoint(url, point, userEmail);
}

// 포인트 UI 업데이트
function updatePointUI() {
    var point = getCurrentPoint();
    var pointDisplay = document.getElementById('pointDisplay');
    if (pointDisplay) {
        pointDisplay.textContent = point;
    }
}

// 포인트 차감 확인
function canConsumePoint(cost) {
    var currentPoint = getCurrentPoint();
    return currentPoint >= cost;
}

// 포인트 차감 후 새로운 포인트 반환
function consumePoint(cost) {
    var currentPoint = getCurrentPoint();
    if (currentPoint >= cost) {
        return currentPoint - cost;
    }
    return currentPoint;
}

// 포인트 부족 모달 표시
function showPointLackModal() {
    var modal = document.getElementById('pointLackModal');
    if (modal) {
        modal.classList.add('modal--active');
    }
}

// 포인트 부족 모달 닫기
function closePointLackModal() {
    var modal = document.getElementById('pointLackModal');
    if (modal) {
        modal.classList.remove('modal--active');
    }
}

// 메인 페이지로 이동
function goToMain() {
}

// 뒤로 가기
function goBack(pageUrl) {
    location.href=pageUrl;
}

function goToPage(pagesUrl){
    location.href=pagesUrl;
}

// 페이지 로드 시 포인트 UI 업데이트
document.addEventListener('DOMContentLoaded', function() {
    updatePointUI();
    updateUserUI();
});

// 로그인 페이지로 이동
function goToLogin() {
    var point = getCurrentPoint();
    navigateWithPoint('login.html', point);
}

// 결과를 URL에 인코딩하여 저장
function encodeResult(resultIndex, category, type) {
    return btoa(category + ':' + type + ':' + resultIndex);
}

// URL에서 결과 디코딩
function decodeResult(encoded) {
    try {
        var decoded = atob(encoded);
        var parts = decoded.split(':');
        return {
            category: parts[0],  // 'saju' or 'tarot'
            type: parts[1],      // 'daily', 'love', 'one-card' 등
            index: parseInt(parts[2])
        };
    } catch (e) {
        return null;
    }
}
