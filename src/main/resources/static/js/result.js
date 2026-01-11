// 결과 페이지 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // URL에서 결과 데이터 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var resultData = urlParams.get('data');
    
    if (!resultData) {
        // 데이터가 없으면 메인으로 이동
        goToMain();
        return;
    }
    
    // 결과 디코딩
    var decoded = decodeResult(resultData);
    if (!decoded) {
        goToMain();
        return;
    }
    
    var resultTitle = document.getElementById('resultTitle');
    var resultContent = document.getElementById('resultContent');
    
    // 로딩 표시
    if (decoded.category === 'saju') {
        Loading.show({
            title: '사주를 분석하고 있습니다',
            text: '전통 운세 데이터베이스에서 정보를 불러오는 중...'
        });
    } else if (decoded.category === 'tarot') {
        Loading.show({
            title: '타로를 해석하고 있습니다',
            text: 'AI가 선택한 카드의 의미를 분석 중...'
        });
    }
    
    // 2-3초 후 결과 표시
    setTimeout(function() {
        var result;
        
        // 카테고리와 타입에 따라 결과 가져오기
        if (decoded.category === 'saju') {
            var results = sajuResultsByType[decoded.type] || sajuResultsByType['daily'];
            result = results[decoded.index % results.length];
        } else if (decoded.category === 'tarot') {
            var results = tarotResultsByType[decoded.type] || tarotResultsByType['one-card'];
            result = results[decoded.index % results.length];
        }
        
        // 결과 표시
        if (result && resultTitle && resultContent) {
            resultTitle.textContent = result.title;
            resultContent.innerHTML = result.content;
        } else {
            resultContent.innerHTML = '<p>결과를 불러올 수 없습니다.</p>';
        }
        
        // 로딩 숨김
        Loading.hide();
    }, 2500);
});
