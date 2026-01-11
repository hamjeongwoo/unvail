// 타로 페이지 스크립트

var selectedTarotCards = [];
var requiredCardCount = 1;
var currentType = 'one-card';
var currentCost = 10;

// 타로 카드 데이터 (메이저 아르카나 22장)
var tarotCards = [
    { name: '광대', image: '0. 바보 카드.jpg', number: '0', color: '#FFD700' },
    { name: '마법사', image: '1. 마법사 카드.jpg', number: 'I', color: '#9B59B6' },
    { name: '여사제', image: '2. 여사제 카드.jpg', number: 'II', color: '#3498DB' },
    { name: '여황제', image: '3. 여황제 카드.jpg', number: 'III', color: '#E91E63' },
    { name: '황제', image: '4. 황제 카드.jpg', number: 'IV', color: '#E74C3C' },
    { name: '교황', image: '5. 교황 카드.jpg', number: 'V', color: '#95A5A6' },
    { name: '연인', image: '6. 연인 카드.jpg', number: 'VI', color: '#FF6B9D' },
    { name: '전차', image: '7. 전차 카드.jpg', number: 'VII', color: '#34495E' },
    { name: '힘', image: '8. 힘 카드.jpg', number: 'VIII', color: '#F39C12' },
    { name: '은둔자', image: '9. 은둔자 카드.jpg', number: 'IX', color: '#7F8C8D' },
    { name: '운명의 수레바퀴', image: '10. 운명의 수레바퀴.jpg', number: 'X', color: '#1ABC9C' },
    { name: '정의', image: '11. 정의 카드.jpg', number: 'XI', color: '#2C3E50' },
    { name: '매달린 사람', image: '12. 행맨 카드.jpg', number: 'XII', color: '#16A085' },
    { name: '죽음', image: '13. 죽음 카드.jpg', number: 'XIII', color: '#2C2C2C' },
    { name: '절제', image: '14. 절제 카드.jpg', number: 'XIV', color: '#9B59B6' },
    { name: '악마', image: '15. 악마 카드.jpg', number: 'XV', color: '#C0392B' },
    { name: '탑', image: '16. 타워 카드.jpg', number: 'XVI', color: '#95A5A6' },
    { name: '별', image: '17. 별 카드.jpg', number: 'XVII', color: '#3498DB' },
    { name: '달', image: '18. 달 카드.jpg', number: 'XVIII', color: '#8E44AD' },
    { name: '태양', image: '19. 태양 카드.jpg', number: 'XIX', color: '#F1C40F' },
    { name: '심판', image: '20. 심판 카드.jpg', number: 'XX', color: '#E67E22' },
    { name: '세계', image: '21. 세계 카드.jpg', number: 'XXI', color: '#27AE60' }
];

// 타로 종류 정보
var tarotTypeInfo = {
    'one-card': { name: '원카드 타로', cost: 10, cards: 1, spread: 5 },
    'three-card': { name: '쓰리카드 타로', cost: 20, cards: 3, spread: 5 },
    'celtic-cross': { name: '켈틱 크로스', cost: 30, cards: 10, spread: 15 },
    'question-yesno': { name: 'Yes/No 질문', cost: 10, cards: 1, spread: 3 },
    'question-love': { name: '연애·인간관계', cost: 20, cards: 3, spread: 7 },
    'question-career': { name: '재물·직업·이직', cost: 30, cards: 3, spread: 10 },
    'question-future': { name: '흐름·운세 질문', cost: 35, cards: 3, spread: 12 }
};

document.addEventListener('DOMContentLoaded', function() {
    // URL에서 type과 cost 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    currentType = urlParams.get('type') || 'one-card';
    currentCost = parseInt(urlParams.get('cost')) || 10;
    
    var typeInfo = tarotTypeInfo[currentType];
    if (typeInfo) {
        requiredCardCount = typeInfo.cards;
        document.getElementById('tarotTypeTitle').textContent = typeInfo.name;
        document.getElementById('tarotTypeCost').textContent = typeInfo.cost + ' 포인트 소비';
        document.getElementById('tarotSubmit').textContent = '결과 보기 (' + typeInfo.cost + ' 포인트)';
        
        // 카드 개수에 따른 안내문구 변경
        if (requiredCardCount === 1) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 마음에 드는 카드를 선택하세요';
        } else if (requiredCardCount === 3) {
            document.getElementById('tarotInstruction').textContent = '질문을 입력하고 세 장의 카드를 선택하세요';
        } else if (requiredCardCount === 10) {
            document.getElementById('tarotInstruction').textContent = '열 장의 카드를 선택하세요';
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
        var cardData = shuffledCards[i % tarotCards.length];
        
        var card = document.createElement('div');
        card.className = 'tarot__card';
        card.setAttribute('data-card', i);
        card.onclick = function() {
            var cardIndex = parseInt(this.getAttribute('data-card'));
            selectTarotCard(cardIndex);
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
        img.style.objectFit = 'cover';
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

// 타로 카드 선택 처리
function selectTarotCard(cardIndex) {
    // 이미 선택된 카드인지 확인
    var isSelected = selectedTarotCards.indexOf(cardIndex) > -1;
    
    if (isSelected) {
        // 선택 취소
        selectedTarotCards = selectedTarotCards.filter(function(idx) { return idx !== cardIndex; });
    } else {
        // 필요한 카드 개수만큼 선택되었는지 확인
        if (selectedTarotCards.length >= requiredCardCount) {
            return;
        }
        selectedTarotCards.push(cardIndex);
    }
    
    updateCardDisplay();
}

// 카드 표시 업데이트
function updateCardDisplay() {
    var cards = document.querySelectorAll('.tarot__card');
    
    cards.forEach(function(card, index) {
        card.classList.remove('selected');
        card.classList.remove('disabled');
        
        if (selectedTarotCards.indexOf(index) > -1) {
            card.classList.add('selected');
        } else if (selectedTarotCards.length >= requiredCardCount) {
            card.classList.add('disabled');
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
    if (currentType === 'question') {
        var question = document.getElementById('tarotQuestion').value.trim();
        if (!question) {
            alert('질문을 입력해주세요.');
            return;
        }
    }
    
    // 포인트 확인
    if (!canConsumePoint(currentCost)) {
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
    var newPoint = consumePoint(currentCost);
    
    // 타입에 따른 더미 결과 선택
    var results = tarotResultsByType[currentType] || tarotResultsByType['one-card'];
    var randomIndex = Math.floor(Math.random() * results.length);
    
    // 결과 페이지로 이동
    var resultData = encodeResult(randomIndex, 'tarot', currentType);
    window.location.href = 'result.html?point=' + newPoint + '&data=' + resultData;
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
