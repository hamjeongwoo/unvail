// 충전 페이지 상태
const chargeState = {
    selectedTicket: 'b',
    selectedPayment: null
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updatePointUI();
    updateCurrentPoint();
    initTermsCheckboxes();
    initSelectedStates();

    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const success = urlParams.get('success');
    if(error === 'ok') showChargeErrorModal()
    if(success === 'ok') showChargeSuccessModal();
});

// 현재 포인트 표시
function updateCurrentPoint() {
}

// 패키지 선택
function selectPackage(el) {
    // 모든 패키지 비활성화
    var packages = document.querySelectorAll('.package-item');
    packages.forEach(function(pkg) {
        pkg.classList.remove('package-item--selected');
    });

    el.classList.add('package-item--selected');
    chargeState.selectedTicket = el.dataset.ticketId;

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
    if (chargeState.selectedTicket &&
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
    if (!chargeState.selectedTicket || !chargeState.selectedPayment) {
        return;
    }

    if(chargeState.selectedPayment === 'kakao'){
        // 로딩 표시 (실제로는 결제 API 호출)
        const chargeBtn = document.getElementById('chargeBtn');
        const originalText = chargeBtn.textContent;
        chargeBtn.disabled = true;
        chargeBtn.textContent = '처리 중...';

        requestPayment();
    }else{
        showModal({
            title: '구매하기',
            message: `준비중 입니다...`,
            type: 'warning',
            confirmText: '확인',
            showCancel: false,
        });
    }
}

function requestPayment() {
    PortOne.requestPayment({
        storeId: "store-d634ec72-0de5-4990-84fc-f2aa1450b88b",
        channelKey: "channel-key-9878a0fa-0a48-4ac4-8b16-8a53bff786c3",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "나이키 와플 트레이너 2 SD",
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: getPayMethod(),
        redirectUrl: `${location.host}/payment/${chargeState.selectedPayment}/complete`,
    });
}

function getPayMethod(){
    if(chargeState.selectedPayment === 'kakao'
        || chargeState.selectedPayment === 'naver'
        || chargeState.selectedPayment === 'toss'){
        return "EASY_PAY"
    }else{
        return "CARD"
    }
}

function showChargeSuccessModal() {
    showModal({
        title: '구매 성공',
        message: `이용권 구매가 정상 처리 되었습니다.`,
        type: 'success',
        confirmText: '확인',
        showCancel: false,
    });
}

function showChargeErrorModal() {
    showModal({
        title: '구매하기',
        message: `결제 처리가 이루어 지지 않았습니다.`,
        type: 'error',
        confirmText: '확인',
        showCancel: false,
    });
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
            chargeState.selectedTicket = parseInt(points);
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