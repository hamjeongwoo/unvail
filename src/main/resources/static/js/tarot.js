// 타로 페이지 스크립트

var selectedTarotCards = [];
var setSelectedCards = new Set;
var requiredCardCount = 1;
var currentType = 'one-card';
var currentCost = 10;
var selectionMode = 'slow'; // 'fast' 또는 'slow', 기본값은 자세히 보기

// 타로 카드 데이터 (78장 풀덱)
var tarotCards = [
    // 메이저 아르카나 (22장)
    { name: '광대', image: '0. 바보 카드.jpg', number: '0', color: '#FFD700', suit: 'major' },
    { name: '마법사', image: '1. 마법사 카드.jpg', number: 'I', color: '#9B59B6', suit: 'major' },
    { name: '여사제', image: '2. 여사제 카드.jpg', number: 'II', color: '#3498DB', suit: 'major' },
    { name: '여황제', image: '3. 여황제 카드.jpg', number: 'III', color: '#E91E63', suit: 'major' },
    { name: '황제', image: '4. 황제 카드.jpg', number: 'IV', color: '#E74C3C', suit: 'major' },
    { name: '교황', image: '5. 교황 카드.jpg', number: 'V', color: '#95A5A6', suit: 'major' },
    { name: '연인', image: '6. 연인 카드.jpg', number: 'VI', color: '#FF6B9D', suit: 'major' },
    { name: '전차', image: '7. 전차 카드.jpg', number: 'VII', color: '#34495E', suit: 'major' },
    { name: '힘', image: '8. 힘 카드.jpg', number: 'VIII', color: '#F39C12', suit: 'major' },
    { name: '은둔자', image: '9. 은둔자 카드.jpg', number: 'IX', color: '#7F8C8D', suit: 'major' },
    { name: '운명의 수레바퀴', image: '10. 운명의 수레바퀴.jpg', number: 'X', color: '#1ABC9C', suit: 'major' },
    { name: '정의', image: '11. 정의 카드.jpg', number: 'XI', color: '#2C3E50', suit: 'major' },
    { name: '매달린 사람', image: '12. 행맨 카드.jpg', number: 'XII', color: '#16A085', suit: 'major' },
    { name: '죽음', image: '13. 죽음 카드.jpg', number: 'XIII', color: '#2C2C2C', suit: 'major' },
    { name: '절제', image: '14. 절제 카드.jpg', number: 'XIV', color: '#9B59B6', suit: 'major' },
    { name: '악마', image: '15. 악마 카드.jpg', number: 'XV', color: '#C0392B', suit: 'major' },
    { name: '탑', image: '16. 타워 카드.jpg', number: 'XVI', color: '#95A5A6', suit: 'major' },
    { name: '별', image: '17. 별 카드.jpg', number: 'XVII', color: '#3498DB', suit: 'major' },
    { name: '달', image: '18. 달 카드.jpg', number: 'XVIII', color: '#8E44AD', suit: 'major' },
    { name: '태양', image: '19. 태양 카드.jpg', number: 'XIX', color: '#F1C40F', suit: 'major' },
    { name: '심판', image: '20. 심판 카드.jpg', number: 'XX', color: '#E67E22', suit: 'major' },
    { name: '세계', image: '21. 세계 카드.jpg', number: 'XXI', color: '#27AE60', suit: 'major' },

    // 완드 (Wands) - 14장
    { name: '완드 에이스', image: '완드 에이스.jpg', number: 'Ace', color: '#E74C3C', suit: 'wands' },
    { name: '완드 2', image: '완드2.jpg', number: '2', color: '#E74C3C', suit: 'wands' },
    { name: '완드 3', image: '완드3.jpg', number: '3', color: '#E74C3C', suit: 'wands' },
    { name: '완드 4', image: '완드4.jpg', number: '4', color: '#E74C3C', suit: 'wands' },
    { name: '완드 5', image: '완드5.jpg', number: '5', color: '#E74C3C', suit: 'wands' },
    { name: '완드 6', image: '완드6.jpg', number: '6', color: '#E74C3C', suit: 'wands' },
    { name: '완드 7', image: '완드7.jpg', number: '7', color: '#E74C3C', suit: 'wands' },
    { name: '완드 8', image: '완드8.jpg', number: '8', color: '#E74C3C', suit: 'wands' },
    { name: '완드 9', image: '완드9.jpg', number: '9', color: '#E74C3C', suit: 'wands' },
    { name: '완드 10', image: '완드10.jpg', number: '10', color: '#E74C3C', suit: 'wands' },
    { name: '완드 페이지', image: '완드 페이지.jpg', number: 'Page', color: '#E74C3C', suit: 'wands' },
    { name: '완드 나이트', image: '완드 나이트.jpg', number: 'Knight', color: '#E74C3C', suit: 'wands' },
    { name: '완드 퀸', image: '완드 퀸.jpg', number: 'Queen', color: '#E74C3C', suit: 'wands' },
    { name: '완드 킹', image: '완드 킹.jpg', number: 'King', color: '#E74C3C', suit: 'wands' },

    // 컵 (Cups) - 14장
    { name: '컵 에이스', image: '컵 에이스.jpg', number: 'Ace', color: '#3498DB', suit: 'cups' },
    { name: '컵 2', image: '컵2.jpg', number: '2', color: '#3498DB', suit: 'cups' },
    { name: '컵 3', image: '컵3.jpg', number: '3', color: '#3498DB', suit: 'cups' },
    { name: '컵 4', image: '컵4.jpg', number: '4', color: '#3498DB', suit: 'cups' },
    { name: '컵 5', image: '컵5.jpg', number: '5', color: '#3498DB', suit: 'cups' },
    { name: '컵 6', image: '컵6.jpg', number: '6', color: '#3498DB', suit: 'cups' },
    { name: '컵 7', image: '컵7.jpg', number: '7', color: '#3498DB', suit: 'cups' },
    { name: '컵 8', image: '컵8.jpg', number: '8', color: '#3498DB', suit: 'cups' },
    { name: '컵 9', image: '컵9.jpg', number: '9', color: '#3498DB', suit: 'cups' },
    { name: '컵 10', image: '컵10.jpg', number: '10', color: '#3498DB', suit: 'cups' },
    { name: '컵 페이지', image: '컵 페이지.jpg', number: 'Page', color: '#3498DB', suit: 'cups' },
    { name: '컵 나이트', image: '컵 나이트.jpg', number: 'Knight', color: '#3498DB', suit: 'cups' },
    { name: '컵 퀸', image: '컵 퀸.jpg', number: 'Queen', color: '#3498DB', suit: 'cups' },
    { name: '컵 킹', image: '컵 킹.jpg', number: 'King', color: '#3498DB', suit: 'cups' },

    // 소드 (Swords) - 14장
    { name: '소드 에이스', image: '소드 에이스.jpg', number: 'Ace', color: '#95A5A6', suit: 'swords' },
    { name: '소드 2', image: '소드2.jpg', number: '2', color: '#95A5A6', suit: 'swords' },
    { name: '소드 3', image: '소드3.jpg', number: '3', color: '#95A5A6', suit: 'swords' },
    { name: '소드 4', image: '소드4.jpg', number: '4', color: '#95A5A6', suit: 'swords' },
    { name: '소드 5', image: '소드5.jpg', number: '5', color: '#95A5A6', suit: 'swords' },
    { name: '소드 6', image: '소드6.jpg', number: '6', color: '#95A5A6', suit: 'swords' },
    { name: '소드 7', image: '소드7.jpg', number: '7', color: '#95A5A6', suit: 'swords' },
    { name: '소드 8', image: '소드8.jpg', number: '8', color: '#95A5A6', suit: 'swords' },
    { name: '소드 9', image: '소드9.jpg', number: '9', color: '#95A5A6', suit: 'swords' },
    { name: '소드 10', image: '소드10.jpg', number: '10', color: '#95A5A6', suit: 'swords' },
    { name: '소드 페이지', image: '소드 페이지.jpg', number: 'Page', color: '#95A5A6', suit: 'swords' },
    { name: '소드 나이트', image: '소드 나이트.jpg', number: 'Knight', color: '#95A5A6', suit: 'swords' },
    { name: '소드 퀸', image: '소드 퀸.jpg', number: 'Queen', color: '#95A5A6', suit: 'swords' },
    { name: '소드 킹', image: '소드 킹.jpg', number: 'King', color: '#95A5A6', suit: 'swords' },

    // 펜타클 (Pentacles) - 14장
    { name: '펜타클 에이스', image: '펜타클 에이스.jpg', number: 'Ace', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 2', image: '펜타클2.jpg', number: '2', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 3', image: '펜타클3.jpg', number: '3', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 4', image: '펜타클4.jpg', number: '4', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 5', image: '펜타클5.jpg', number: '5', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 6', image: '펜타클6.jpg', number: '6', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 7', image: '펜타클7.jpg', number: '7', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 8', image: '펜타클8.jpg', number: '8', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 9', image: '펜타클9.jpg', number: '9', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 10', image: '펜타클10.jpg', number: '10', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 페이지', image: '펜타클 페이지.jpg', number: 'Page', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 나이트', image: '펜타클 나이트.jpg', number: 'Knight', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 퀸', image: '펜타클 퀸.jpg', number: 'Queen', color: '#F39C12', suit: 'pentacles' },
    { name: '펜타클 킹', image: '펜타클 킹.jpg', number: 'King', color: '#F39C12', suit: 'pentacles' }
];

// 타로 종류 정보
var tarotTypeInfo = {
    'one-card': { name: '원카드 타로', cost: 500, cards: 1, spread: 5, qna: '오늘의 운세, 간단한 조언 리딩을 원합니다.'},
    'three-card': { name: '쓰리카드 타로', cost: 600, cards: 3, spread: 5, qna: '과거-현재-미래 흐름 파악 리딩을 원합니다.' },
    'four-card': { name: '포카드 타로', cost: 700, cards: 4, spread: 7, qna: '복잡한 상황, 갈등 해결 문제의 원인과 해결책 탐색 리딩을 원합니다.' },
    'five-card': { name: '파이브카드 타로', cost: 800, cards: 5, spread: 9, qna: '중요한 결정, 인생 전환점 심층 분석과 구체적 조언 리딩을 원합니다.' },
    'celtic-cross': { name: '켈틱 크로스', cost: 900, cards: 10, spread: 15, qna: '인생 전반 종합 운세, 가장 상세하고 깊이 있는 리딩을 원합니다.' }
};

document.addEventListener('DOMContentLoaded', function() {
    // URL에서 type과 cost 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    currentType = urlParams.get('type')

    if(!currentType){
        alert('비정상적인 접근입니다.');
        goToMain();
    }

    currentCost = parseInt(urlParams.get('cost')) || 10;

    var typeInfo = tarotTypeInfo[currentType];
    if (typeInfo) {
        document.getElementById('tarotQuestion').textContent = typeInfo.qna;

        requiredCardCount = typeInfo.cards;
        document.getElementById('tarotTypeTitle').textContent = typeInfo.name;
        document.getElementById('tarotTypeCost').textContent = typeInfo.cost + ' 포인트 소비';
        document.getElementById('tarotSubmit').textContent = '결과 보기 (' + typeInfo.cost + ' 포인트)';

        // 카드 개수에 따른 안내문구 변경
        if (requiredCardCount === 1) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 마음에 드는 카드를 선택하세요';
        } else if (requiredCardCount === 3) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 세 장의 카드를 선택하세요';
        } else if (requiredCardCount === 4) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 네 장의 카드를 선택하세요';
        } else if (requiredCardCount === 5) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 다섯 장의 카드를 선택하세요';
        } else if (requiredCardCount === 10) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 열 장의 카드를 선택하세요';
        }
    }

    // 질문 기반 점사인 경우 질문 입력 필드 표시
    if (currentType.startsWith('question-')) {
        document.getElementById('tarotQuestionGroup').style.display = 'flex';
    }

    // 카드 생성
    createTarotCards();
    resetTarotCards();
});

// 타로 카드 동적 생성
function createTarotCards() {
    var cardsContainer = document.getElementById('tarotCards');
    cardsContainer.innerHTML = '';

    // 타로 종류별로 펼칠 카드 수 결정
    var typeInfo = tarotTypeInfo[currentType];
    var totalCards = typeInfo && typeInfo.spread ? typeInfo.spread : 5;

    // 카드 배열 섞기
    var shuffledCards = tarotCards.slice().sort(function() { return Math.random() - 0.5; });

    for (var i = 0; i < totalCards; i++) {
        const cardData = shuffledCards[i % tarotCards.length];

        var card = document.createElement('div');
        card.className = 'tarot__card';
        card.setAttribute('data-card', i);
        card.onclick = function() {
            var cardIndex = parseInt(this.getAttribute('data-card'));
            selectTarotCard(cardIndex, cardData);
        };

        var cardInner = document.createElement('div');
        cardInner.className = 'tarot__card-inner';

        var cardBack = document.createElement('div');
        cardBack.className = 'tarot__card-back';
        cardBack.textContent = '✦';

        var cardFront = document.createElement('div');
        cardFront.className = 'tarot__card-front';
        cardFront.style.background = 'linear-gradient(135deg, ' + cardData.color + ' 0%, ' + adjustColorBrightness(cardData.color, -30) + ' 100%)';

        var cardNumber = document.createElement('div');
        cardNumber.className = 'tarot__card-number';
        cardNumber.textContent = cardData.number;

        var cardEmoji = document.createElement('div');
        cardEmoji.className = 'tarot__card-emoji';

        // 실제 이미지 사용
        var img = document.createElement('img');
        img.src = '/css/images/' + cardData.image;
        img.alt = cardData.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        cardEmoji.appendChild(img);

        var cardName = document.createElement('div');
        cardName.className = 'tarot__card-name';
        cardName.textContent = cardData.name;

        cardFront.appendChild(cardNumber);
        cardFront.appendChild(cardEmoji);
        cardFront.appendChild(cardName);

        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        card.appendChild(cardInner);
        cardsContainer.appendChild(card);
    }
}

// 모드 변경
function changeMode(mode) {
    selectionMode = mode;

    // 버튼 스타일 업데이트
    var buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(function(btn) {
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('mode-btn--active');
        } else {
            btn.classList.remove('mode-btn--active');
        }
    });
}

// 타로 카드 선택 처리
function selectTarotCard(cardIndex, cardData) {
    // 이미 선택된 카드인지 확인
    var isSelected = selectedTarotCards.indexOf(cardIndex) > -1;

    if (isSelected) {
        // 선택 취소
        selectedTarotCards = selectedTarotCards.filter(function(idx) { return idx !== cardIndex; });
        setSelectedCards.delete(cardData);
        updateCardDisplay();
    } else {
        // 필요한 카드 개수만큼 선택되었는지 확인
        if (selectedTarotCards.length >= requiredCardCount) {
            return;
        }
        setSelectedCards.add(cardData);
        selectedTarotCards.push(cardIndex);

        // 신중모드일 경우 확대 애니메이션 표시
        if (selectionMode === 'slow') {
            showCardZoom(cardIndex);
        } else {
            updateCardDisplay();
        }
    }
}

// 카드 확대 보기 (신중모드)
function showCardZoom(cardIndex) {
    var card = document.querySelectorAll('.tarot__card')[cardIndex];
    var cardInner = card.querySelector('.tarot__card-inner');
    var cardFront = card.querySelector('.tarot__card-front');

    // 카드 복제하여 오버레이에 표시
    var overlay = document.createElement('div');
    overlay.className = 'card-zoom-overlay';

    var zoomCard = document.createElement('div');
    zoomCard.className = 'card-zoom';
    zoomCard.innerHTML = cardFront.innerHTML;
    zoomCard.style.background = cardFront.style.background;

    overlay.appendChild(zoomCard);
    document.body.appendChild(overlay);

    // 애니메이션 시작
    setTimeout(function() {
        overlay.classList.add('active');
        zoomCard.classList.add('active');
    }, 10);

    // 카드 뒤집기
    cardInner.style.transform = 'rotateY(180deg)';
    card.classList.add('selected');

    // 1.5초 후 사라지기
    setTimeout(function() {
        overlay.classList.add('fade-out');
        setTimeout(function() {
            document.body.removeChild(overlay);
            updateCardDisplay();
        }, 300);
    }, 1500);
}

// 카드 표시 업데이트
function updateCardDisplay() {
    var cards = document.querySelectorAll('.tarot__card');

    cards.forEach(function(card, index) {
        var cardInner = card.querySelector('.tarot__card-inner');
        card.classList.remove('selected');
        card.classList.remove('disabled');

        if (selectedTarotCards.indexOf(index) > -1) {
            card.classList.add('selected');
            // 신중모드에서 직접 설정한 경우를 위해 inline style도 확인
            if (cardInner && !cardInner.style.transform) {
                cardInner.style.transform = 'rotateY(180deg)';
            }
        } else {
            // 선택 해제된 카드는 뒷면으로 되돌림
            if (cardInner) {
                cardInner.style.transform = '';
            }
            if (selectedTarotCards.length >= requiredCardCount) {
                card.classList.add('disabled');
            }
        }
    });

    // 제출 버튼 활성화/비활성화
    var submitBtn = document.getElementById('tarotSubmit');
    if (submitBtn) {
        submitBtn.disabled = selectedTarotCards.length !== requiredCardCount;
    }
}

// 타로 결과 제출
function submitTarot() {
    // 필요한 카드가 모두 선택되었는지 확인
    if (selectedTarotCards.length !== requiredCardCount) {
        return;
    }

    // 질문 기반 점사인 경우 질문 검증
    var question = document.getElementById('tarotQuestion').value.trim();

    // 포인트 확인
    // if (!canConsumePoint(currentCost)) {
    //     showModal({
    //         title: '포인트가 부족합니다',
    //         message: '서비스를 이용하기 위한<br>포인트가 부족합니다.',
    //         type: 'warning',
    //         confirmText: '확인',
    //         showCancel: false,
    //         onConfirm: function() {
    //             goToMain();
    //         }
    //     });
    //     return;
    // }


    // 타입에 따른 더미 결과 선택
    const requestParam = {
        type: currentType
        ,cards: [...setSelectedCards]
        ,question: question||'없음'
    }

    let message = `${tarotTypeInfo[currentType].cost}포인트를 사용하여 결과를 확인하시겠습니까?`;
    if (!question) {
        message = `질문을 입력하지 않았습니다. 질문 없이 ${tarotTypeInfo[currentType].cost}포인트를 사용하여 결과를 확인하시겠습니까?`;
    }

    showModal({
        title: '결과보기',
        message: message,
        type: 'info',
        confirmText: '확인',
        cancelText: '취소',
        showCancel: true,
        onConfirm: function() {
            // 결과 페이지로 이동
            var resultData = encodeResult('tarot', tarotTypeInfo[currentType].name, JSON.stringify(requestParam));
            window.location.href = '/pages/result?data=' + resultData;
        },
    });




}

// 타로 카드 상태 초기화
function resetTarotCards() {
    selectedTarotCards = [];
    updateCardDisplay();
}

// 색상 밝기 조절 헬퍼 함수
function adjustColorBrightness(hex, percent) {
    // hex를 RGB로 변환
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);

    // 밝기 조절
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    // 다시 hex로 변환
    return '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2);
}
