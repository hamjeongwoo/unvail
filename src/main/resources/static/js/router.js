// 화면 전환 함수
function showView(viewName) {
    // 모든 view 숨김
    var views = document.querySelectorAll('.view');
    views.forEach(function(view) {
        view.classList.remove('view--active');
    });
    
    // 선택한 view만 표시
    var targetView = document.getElementById(viewName + 'View');
    if (targetView) {
        targetView.classList.add('view--active');
        AppState.currentView = viewName;
    }
    
    // 화면 전환 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
}
