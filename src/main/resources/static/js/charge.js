var AppState = {
    point: 0
}
// 충전 페이지 상태
var chargeState = {
    selectedPoints: null,
    selectedPayment: null
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updatePointUI();
    updateCurrentPoint();
    initTermsCheckboxes();
    initSelectedStates();
});

// 현재 포인트 표시
function updateCurrentPoint() {
    var currentPoint = document.getElementById('currentPoint');
    if (currentPoint) {
        currentPoint.textContent = AppState.point;
    }
}

// 패키지 선택
function selectPackage(points) {
    // 모든 패키지 비활성화
    var packages = document.querySelectorAll('.package-item');
    packages.forEach(function(pkg) {
        pkg.classList.remove('package-item--selected');
    });

    // 선택한 패키지 활성화
    var selectedPackage = document.querySelector('.package-item[data-points="' + points + '"]');
    if (selectedPackage) {
        selectedPackage.classList.add('package-item--selected');
        chargeState.selectedPoints = points;
    }

    // 충전 버튼 활성화 여부 확인
    checkChargeButton();
}

// 결제 수단 선택
function selectPayment(method) {
    // 모든 결제 수단 비활성화
    var payments = document.querySelectorAll('.payment-item');
    payments.forEach(function(payment) {
        payment.classList.remove('payment-item--selected');
    });

    // 선택한 결제 수단 활성화
    var selectedPayment = document.querySelector('.payment-item[data-method="' + method + '"]');
    if (selectedPayment) {
        selectedPayment.classList.add('payment-item--selected');
        chargeState.selectedPayment = method;
    }

    // 충전 버튼 활성화 여부 확인
    checkChargeButton();
}

// 충전 버튼 활성화 여부 확인
function checkChargeButton() {
    var chargeBtn = document.getElementById('chargeBtn');
    var agreeRefund = document.getElementById('agreeRefund');
    var agreeService = document.getElementById('agreeService');

    // 패키지, 결제수단, 약관 모두 동의 시 활성화
    if (chargeState.selectedPoints &&
        chargeState.selectedPayment &&
        agreeRefund && agreeRefund.checked &&
        agreeService && agreeService.checked) {
        chargeBtn.disabled = false;
    } else {
        chargeBtn.disabled = true;
    }
}

// 충전 처리
function processCharge() {
    if (!chargeState.selectedPoints || !chargeState.selectedPayment) {
        return;
    }

    // 로딩 표시 (실제로는 결제 API 호출)
    var chargeBtn = document.getElementById('chargeBtn');
    var originalText = chargeBtn.textContent;
    chargeBtn.disabled = true;
    chargeBtn.textContent = '처리 중...';

    // 더미 결제 처리 (실제로는 결제 API 연동)
    setTimeout(function() {
        // 포인트 추가
        var pointsToAdd = chargeState.selectedPoints;

        // 보너스 적용
        if (chargeState.selectedPoints === 3000) {
            pointsToAdd = Math.floor(pointsToAdd * 1.05); // 5% 보너스
        } else if (chargeState.selectedPoints === 5000) {
            pointsToAdd = Math.floor(pointsToAdd * 1.10); // 10% 보너스
        }

        AppState.point += pointsToAdd;
        updatePointUI();
        updateCurrentPoint();

        // 성공 모달 표시
        showChargeSuccessModal(pointsToAdd);

        // 버튼 원상복구
        chargeBtn.disabled = false;
        chargeBtn.textContent = originalText;

        // 선택 초기화
        resetSelection();
    }, 1500);
}

// 충전 성공 모달
function showChargeSuccessModal(points) {
    var modal = document.createElement('div');
    modal.className = 'modal modal--active';
    modal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content modal__content--success">
            <div class="modal__icon">✓</div>
            <h3 class="modal__title">충전 완료</h3>
            <p class="modal__desc">
                ${points.toLocaleString()} 포인트가 충전되었습니다.<br>
                현재 보유: ${AppState.point.toLocaleString()} 포인트
            </p>
            <button class="btn btn--primary btn--large" onclick="closeSuccessModal()">확인</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// 성공 모달 닫기
function closeSuccessModal() {
    var modal = document.querySelector('.modal--active');
    if (modal) {
        modal.remove();
    }
}

// 선택 초기화
function resetSelection() {
    // 패키지 선택 초기화
    var packages = document.querySelectorAll('.package-item');
    packages.forEach(function(pkg) {
        pkg.classList.remove('package-item--selected');
    });

    // 결제 수단 선택 초기화
    var payments = document.querySelectorAll('.payment-item');
    payments.forEach(function(payment) {
        payment.classList.remove('payment-item--selected');
    });

    chargeState.selectedPoints = null;
    chargeState.selectedPayment = null;

    // 충전 버튼 비활성화
    var chargeBtn = document.getElementById('chargeBtn');
    chargeBtn.disabled = true;
}

// 뒤로가기
function goBack() {
    window.location.href = 'main.html';
}

// 전체 약관 동의 토글
function toggleAllTerms() {
    var agreeAll = document.getElementById('agreeAll');
    var checkboxes = document.querySelectorAll('.terms-checkbox');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = agreeAll.checked;
    });

    checkChargeButton();
}

// 약관 체크박스 초기화
function initTermsCheckboxes() {
    var agreeAll = document.getElementById('agreeAll');
    var checkboxes = document.querySelectorAll('.terms-checkbox');

    // 개별 약관 체크박스에 이벤트 리스너 등록
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var allChecked = Array.from(checkboxes).every(function(cb) {
                return cb.checked;
            });
            agreeAll.checked = allChecked;
            checkChargeButton();
        });
    });

    // 전체 동의 체크박스에 이벤트 리스너 등록
    if (agreeAll) {
        agreeAll.addEventListener('change', toggleAllTerms);
    }
}

// 초기 선택 상태 감지 및 설정
function initSelectedStates() {
    // 초기 선택된 패키지 감지
    var selectedPackage = document.querySelector('.package-item--selected');
    if (selectedPackage) {
        var points = selectedPackage.getAttribute('data-points');
        if (points) {
            chargeState.selectedPoints = parseInt(points);
        }
    }

    // 초기 선택된 결제수단 감지
    var selectedPayment = document.querySelector('.payment-item--selected');
    if (selectedPayment) {
        var method = selectedPayment.getAttribute('data-method');
        if (method) {
            chargeState.selectedPayment = method;
        }
    }

    // 초기 상태 확인 후 버튼 활성화 체크
    checkChargeButton();
}

// 환불 정책 모달 표시
function showRefundPolicy() {
    var modal = document.getElementById('refundPolicyModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('policy-modal--active');
        document.body.style.overflow = 'hidden';
    }
}

// 환불 정책 모달 닫기
function closeRefundPolicy() {
    var modal = document.getElementById('refundPolicyModal');
    if (modal) {
        modal.classList.remove('policy-modal--active');
        setTimeout(function() {
            modal.style.display = 'none';
        }, 200);
        document.body.style.overflow = '';
    }
}

// 서비스 제공 정책 모달 표시
function showServicePolicy() {
    var modal = document.getElementById('servicePolicyModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('policy-modal--active');
        document.body.style.overflow = 'hidden';
    }
}

// 서비스 제공 정책 모달 닫기
function closeServicePolicy() {
    var modal = document.getElementById('servicePolicyModal');
    if (modal) {
        modal.classList.remove('policy-modal--active');
        setTimeout(function() {
            modal.style.display = 'none';
        }, 200);
        document.body.style.overflow = '';
    }
}