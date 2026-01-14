// 로그인 페이지 스크립트

// 카카오 로그인
function loginWithKakao() {
    goToPage('/oauth2/authorization/kakao')
}

// 네이버 로그인
function loginWithNaver() {
    goToPage('/oauth2/authorization/naver')
}

// 구글 로그인
function loginWithGoogle() {
    goToPage('/oauth2/authorization/google')
}

// 로그인 완료 처리
function completeLogin(email) {
    var point = getCurrentPoint();
    
    showModal({
        title: '로그인 성공',
        message: '환영합니다!<br>' + email,
        type: 'success',
        confirmText: '확인',
        showCancel: false,
        onConfirm: function() {
            navigateWithUserAndPoint('main.html', point, email);
        }
    });
}

// 로그인 건너뛰기
function skipLogin() {
    var point = getCurrentPoint();
    navigateWithPoint('main.html', point);
}

document.addEventListener('DOMContentLoaded', e => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorCode = urlParams.get('error')
    if(errorCode === 'U002'){
        showModal({
            title: '사용자 중복',
            message: '이미 다른 플랫폼의 동일 이메일로 가입되어 있습니다.',
            type: 'error',
            confirmText: '확인',
        });
    }
});