// 메인 페이지 스크립트

// 사주 종류 선택 페이지로 이동
function goToSaju() {
}

// 타로 종류 선택 페이지로 이동
function goToTarot() {
    goToPage('/pages/landing/tarot-landing')
}

// 포인트 충전 모달 표시
function chargePoints() {
    goToPage('/charge');
    // showModal({
    //     title: '포인트 충전',
    //     message: '100 포인트를 충전하시겠습니까?<br><small style="color: #b8b5c8;">(MVP 버전에서는 무료로 제공됩니다)</small>',
    //     type: 'info',
    //     confirmText: '충전하기',
    //     cancelText: '취소',
    //     showCancel: true,
    //     onConfirm: function() {
    //         confirmCharge();
    //     }
    // });
}

// 포인트 충전 실행
function confirmCharge() {
    var currentPoint = getCurrentPoint();
    var newPoint = currentPoint + 100;
    
    // 포인트 업데이트하고 페이지 새로고침
    navigateWithPoint('main.html', newPoint);
}

// 회사정보 모달 열기
function openBusinessInfo() {
    var modal = document.getElementById('businessInfoModal');
    if (modal) {
        modal.classList.add('business-modal--active');
        document.body.style.overflow = 'hidden';
    }
}

// 회사정보 모달 닫기
function closeBusinessInfo() {
    var modal = document.getElementById('businessInfoModal');
    if (modal) {
        modal.classList.remove('business-modal--active');
        document.body.style.overflow = '';
    }
}

// 개인정보 처리방침 모달 열기
function openPrivacyPolicy() {
    var modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.classList.add('privacy-policy-modal--active');
        document.body.style.overflow = 'hidden';
    }
}

// 개인정보 처리방침 모달 닫기
function closePrivacyPolicy() {
    var modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.classList.remove('privacy-policy-modal--active');
        document.body.style.overflow = '';
    }
}


// 운영방침 모달 열기
function openOperationPolicy() {
    var modal = document.getElementById('operationPolicyModal');
    if (modal) {
        modal.classList.add('operation-policy-modal--active');
        document.body.style.overflow = 'hidden';
    }
}

// 운영방침 모달 닫기
function closeOperationPolicy() {
    var modal = document.getElementById('operationPolicyModal');
    if (modal) {
        modal.classList.remove('operation-policy-modal--active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', e => {
    $('#curPoint').text(currentInfo.curPoint);

    if(currentInfo.isLoggedIn){
        $('#loginBtn').hide();
        $('#userName').text(currentInfo.name);
        $('#userInfo').show();
    }else{
        $('#loginBtn').show();
        $('#userInfo').hide();
    }

    const oauthType = localStorage.getItem('oauthType');
    console.log(oauthType, currentInfo.isLoggedIn)
    if(!currentInfo.isLoggedIn){
        if (oauthType === 'KAKAO') {
            loginWithKakao();
        } else if (oauthType === 'NAVER') {
            loginWithNaver();
        } else if (oauthType === 'GOOGLE') {
            loginWithGoogle();
        } else if (oauthType === 'GITHUB') {
            loginWithGithub();
        }
    }
});

