// 마이페이지 스크립트

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initMyPage();
});

// 마이페이지 초기화
function initMyPage() {
}


// 이용권 이력 모달 열기
function showChargeHistory() {
    var modal = document.getElementById('chargeHistoryModal');
    var listContainer = document.getElementById('chargeHistoryList');
    
    // 더미 데이터 생성
    var chargeHistory = [
        { date: '2026-01-15 14:30', amount: 1000, point: 100, method: '카드' },
        { date: '2026-01-10 09:15', amount: 5000, point: 500, method: '카드' },
        { date: '2026-01-05 18:22', amount: 10000, point: 1100, method: '카카오페이' }
    ];
    
    // 이력 렌더링
    listContainer.innerHTML = '';
    if (chargeHistory.length === 0) {
        listContainer.innerHTML = '<div class="history-empty">이용권 구매 이력이 없습니다.</div>';
    } else {
        chargeHistory.forEach(function(item) {
            var historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = 
                '<div class="history-item__header">' +
                    '<span class="history-item__date">' + item.date + '</span>' +
                    '<span class="history-item__badge history-item__badge--complete">완료</span>' +
                '</div>' +
                '<div class="history-item__body">' +
                    '<div class="history-item__title">이용권 구매</div>' +
                    '<div class="history-item__detail">' +
                        '<span>' + item.point + 'P (+' + (item.point > 100 ? Math.floor(item.point * 0.1) : 0) + 'P 보너스)</span>' +
                        '<span class="history-item__method">' + item.method + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="history-item__footer">' +
                    '<span class="history-item__amount">' + item.amount.toLocaleString() + '원</span>' +
                '</div>';
            listContainer.appendChild(historyItem);
        });
    }
    
    modal.classList.add('history-modal--active');
    document.body.style.overflow = 'hidden';
}

// 이용권 이력 모달 닫기
function closeChargeHistory() {
    var modal = document.getElementById('chargeHistoryModal');
    modal.classList.remove('history-modal--active');
    document.body.style.overflow = '';
}

// Unveil 이력 모달 열기
function showUnveilHistory() {
    var modal = document.getElementById('unveilHistoryModal');
    var listContainer = document.getElementById('unveilHistoryList');
    
    // 더미 데이터 생성
    var unveilHistory = [
        { date: '2026-01-15 15:20', type: '사주', subType: '신년운세', cost: 30 },
        { date: '2026-01-14 20:45', type: '타로', subType: '연애운', cost: 20 },
        { date: '2026-01-12 11:30', type: '사주', subType: '종합운세', cost: 30 },
        { date: '2026-01-10 16:00', type: '타로', subType: '재물운', cost: 20 }
    ];
    
    // 이력 렌더링
    listContainer.innerHTML = '';
    if (unveilHistory.length === 0) {
        listContainer.innerHTML = '<div class="history-empty">이용 이력이 없습니다.</div>';
    } else {
        unveilHistory.forEach(function(item) {
            var historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            var icon = item.type === '사주' ? '🔮' : '🃏';
            historyItem.innerHTML = 
                '<div class="history-item__header">' +
                    '<span class="history-item__date">' + item.date + '</span>' +
                '</div>' +
                '<div class="history-item__body">' +
                    '<div class="history-item__title">' + icon + ' ' + item.type + ' - ' + item.subType + '</div>' +
                '</div>' +
                '<div class="history-item__footer">' +
                    '<span class="history-item__cost">-' + item.cost + 'P</span>' +
                '</div>';
            listContainer.appendChild(historyItem);
        });
    }
    
    modal.classList.add('history-modal--active');
    document.body.style.overflow = 'hidden';
}

// Unveil 이력 모달 닫기
function closeUnveilHistory() {
    var modal = document.getElementById('unveilHistoryModal');
    modal.classList.remove('history-modal--active');
    document.body.style.overflow = '';
}

// 1:1 문의 모달 열기
function showInquiry() {
    var modal = document.getElementById('inquiryModal');
    modal.classList.add('inquiry-modal--active');
    document.body.style.overflow = 'hidden';
}

// 1:1 문의 모달 닫기
function closeInquiry() {
    var modal = document.getElementById('inquiryModal');
    modal.classList.remove('inquiry-modal--active');
    document.body.style.overflow = '';
    
    // 폼 초기화
    document.getElementById('inquiryType').value = '';
    document.getElementById('inquiryContent').value = '';
}

// 문의 제출
function submitInquiry() {
    var type = document.getElementById('inquiryType').value;
    var content = document.getElementById('inquiryContent').value.trim();
    
    if (!type) {
        showModal('알림', '문의 유형을 선택해주세요.');
        return;
    }
    
    if (!content) {
        showModal('알림', '문의 내용을 입력해주세요.');
        return;
    }
    
    // MVP: 실제로는 서버에 전송해야 함
    closeInquiry();
    showModal('문의 접수 완료', '문의가 접수되었습니다.\n빠른 시일 내에 답변드리겠습니다.', function() {
        // 확인 후 처리
    });
}

// 회원 탈퇴
function handleDeleteAccount() {
    showConfirmModal(
        '회원 탈퇴',
        '정말 탈퇴하시겠습니까?\n모든 정보가 삭제되며 복구할 수 없습니다.',
        function() {
            // 탈퇴 처리
            localStorage.clear();
            
            showModal('탈퇴 완료', '회원 탈퇴가 완료되었습니다.', function() {
                window.location.href = 'main.html';
            });
        }
    );
}

// ====================
// 공통 모달 헬퍼 함수 (modal.js 사용)
// ====================

/**
 * 간단한 알림 모달 (확인 버튼만)
 */
function showAlertModal(title, message, onConfirm) {
    showModal({
        title: title,
        message: message,
        type: 'info',
        showCancel: false,
        onConfirm: onConfirm
    });
}

/**
 * 확인/취소 모달
 */
function showConfirmModal(title, message, onConfirm, onCancel) {
    showModal({
        title: title,
        message: message,
        type: 'warning',
        showCancel: true,
        onConfirm: onConfirm,
        onCancel: onCancel
    });
}

/**
 * 성공 모달
 */
function showSuccessModal(title, message, onConfirm) {
    showModal({
        title: title,
        message: message,
        type: 'success',
        showCancel: false,
        onConfirm: onConfirm
    });
}

/**
 * 에러 모달
 */
function showErrorModal(title, message, onConfirm) {
    showModal({
        title: title,
        message: message,
        type: 'error',
        showCancel: false,
        onConfirm: onConfirm
    });
}
