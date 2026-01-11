// 사주 페이지 스크립트

// 사주 종류 정보
var sajuTypeInfo = {
    'daily': { name: '일간', cost: 10 },
    'yearly': { name: '연간', cost: 20 },
    'lifetime': { name: '평생', cost: 30 },
    'question': { name: '질문 기반 점사', cost: 20 }
};

document.addEventListener('DOMContentLoaded', function() {
    // URL에서 type과 cost 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var type = urlParams.get('type') || 'daily';
    var cost = parseInt(urlParams.get('cost')) || 10;
    
    // 타입 정보 표시
    var typeInfo = sajuTypeInfo[type];
    if (typeInfo) {
        document.getElementById('sajuTypeTitle').textContent = typeInfo.name;
        document.getElementById('sajuTypeCost').textContent = typeInfo.cost + ' 포인트 소비';
        document.getElementById('sajuSubmitBtn').textContent = typeInfo.name + ' 보기 (' + typeInfo.cost + ' 포인트)';
    }
    
    // 질문 기반 점사인 경우 질문 입력 필드 표시
    if (type === 'question') {
        document.getElementById('questionGroup').style.display = 'flex';
    }
    
    var sajuForm = document.getElementById('sajuForm');
    
    if (sajuForm) {
        sajuForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 입력값 가져오기
            var name = document.getElementById('sajuName').value.trim();
            var birthDate = document.getElementById('sajuBirthDate').value;
            
            // 기본 유효성 검사
            if (!name || !birthDate) {
                alert('이름과 생년월일을 입력해주세요.');
                return;
            }
            
            // 질문 기반 점사인 경우 질문 검증
            if (type === 'question') {
                var question = document.getElementById('sajuQuestion').value.trim();
                if (!question) {
                    alert('질문을 입력해주세요.');
                    return;
                }
            }
            
            // 포인트 확인
            if (!canConsumePoint(cost)) {
                showModal({
                    title: '포인트가 부족합니다',
                    message: '서비스를 이용하기 위한<br>포인트가 부족합니다.',
                    type: 'warning',
                    confirmText: '확인',
                    showCancel: false,
                    onConfirm: function() {
                        goToMain();
                    }
                });
                return;
            }
            
            // 포인트 차감
            var newPoint = consumePoint(cost);
            
            // 타입에 따른 더미 결과 선택
            var results = sajuResultsByType[type] || sajuResultsByType['total'];
            var randomIndex = Math.floor(Math.random() * results.length);
            
            // 결과 페이지로 이동
            var resultData = encodeResult(randomIndex, 'saju', type);
            window.location.href = 'result.html?point=' + newPoint + '&data=' + resultData;
        });
    }
});
