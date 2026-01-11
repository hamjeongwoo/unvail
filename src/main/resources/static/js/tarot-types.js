// 타로 종류 선택 페이지 스크립트

function selectTarotType(type, cost) {
    window.location.href = '/pages/tarot?type=' + type;
}

// 질문 기반 점사 세부 선택 화면 표시
function showQuestionTypes() {
    document.getElementById('mainTypeView').style.display = 'none';
    document.getElementById('questionTypeView').style.display = 'block';
}

// 메인 타로 종류 선택 화면으로 돌아가기
function showMainTypes() {
    document.getElementById('mainTypeView').style.display = 'block';
    document.getElementById('questionTypeView').style.display = 'none';
}
