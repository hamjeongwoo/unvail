// 전역 상태 객체
var AppState = {
    point: 100,
    currentView: 'main',
    lastResult: null,
    selectedTarotCard: null
};

// 포인트 UI 업데이트
function updatePointUI() {
    var pointDisplay = document.getElementById('pointDisplay');
    if (pointDisplay) {
        pointDisplay.textContent = AppState.point;
    }
}

// 포인트 차감 함수
function consumePoint(cost) {
    if (AppState.point < cost) {
        showPointLackModal();
        return false;
    }
    AppState.point -= cost;
    updatePointUI();
    return true;
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

// 포인트 충전 모달 표시
function showChargeModal() {
    var modal = document.getElementById('chargeModal');
    if (modal) {
        modal.classList.add('modal--active');
    }
}

// 포인트 충전 모달 닫기
function closeChargeModal() {
    var modal = document.getElementById('chargeModal');
    if (modal) {
        modal.classList.remove('modal--active');
    }
}

// 포인트 충전 실행
function chargePoints() {
    AppState.point += 100;
    updatePointUI();
    closeChargeModal();
    
    // 간단한 피드백
    alert('100 포인트가 충전되었습니다! 현재 포인트: ' + AppState.point);
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    updatePointUI();
});
