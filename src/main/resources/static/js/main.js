// 메인 페이지 스크립트

// 사주 종류 선택 페이지로 이동
function goToSaju() {
    var point = getCurrentPoint();
    navigateWithPoint('/pages/saju-types', point);
}

// 타로 종류 선택 페이지로 이동
function goToTarot() {
    var point = getCurrentPoint();
    navigateWithPoint('/pages/tarot-types', point);
}

// 포인트 충전 모달 표시
function chargePoints() {
    goToPage('/pages/charge');
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

});
