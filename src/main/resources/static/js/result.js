// 결과 페이지 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // URL에서 결과 데이터 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var resultData = urlParams.get('data');

    if (!resultData) {
        // 데이터가 없으면 메인으로 이동
        alert('데이터가 존재하지 않습니다.');
        goToMain();
        return;
    }

    // 결과 디코딩
    var decoded = decodeResult(resultData);
    if (!decoded) {
        alert('정보를 디코딩 하는 중 문제가 발생 하였습니다.');
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
    _ac.post(`/api/ai/v1/tarot/prompt?type=${decoded.requestParam.type}`, decoded.requestParam)
      .then(res => {
          resultTitle.textContent = '';
          resultContent.innerHTML = res.data
          // 공유 버튼 표시
          var shareBtn = document.getElementById('shareBtn');
          if (shareBtn) {
              shareBtn.style.display = 'flex';
          }
      })
      .finally(() => {
          Loading.hide();
      })
});


// 공유 옵션 선택 모달
function showShareOptionsModal() {
    showModal({
        title: '공유 방법 선택',
        message: '어떤 방식으로 공유하시겠습니까?',
        type: 'info',
        customButtons: [
            {
                text: '🔗 링크 공유',
                class: 'btn btn--secondary',
                onClick: function() {
                    shareUrl();
                }
            },
            {
                text: '📸 이미지 공유',
                class: 'btn btn--primary',
                onClick: function() {
                    shareImage();
                }
            }
        ],
        showCancel: true,
        cancelText: '취소'
    });
}

// URL 공유
function shareUrl() {
    var currentUrl = window.location.href;

    // Web Share API 지원 확인
    if (navigator.share) {
        navigator.share({
            title: 'Unveil 결과',
            text: '내 운세 결과를 확인해보세요!',
            url: currentUrl
        }).then(function() {
            // 공유 성공
        }).catch(function(error) {
            // 사용자가 취소한 경우 에러 무시
            if (error.name !== 'AbortError') {
                // 폴백: 클립보드 복사
                copyToClipboard(currentUrl);
            }
        });
    } else {
        // Web Share API 미지원 시 클립보드 복사
        copyToClipboard(currentUrl);
    }
}

// 클립보드 복사
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showModal({
                title: '링크 복사 완료',
                message: '링크가 클립보드에 복사되었습니다.<br>원하는 곳에 붙여넣기 해보세요!',
                type: 'success',
                confirmText: '확인',
                showCancel: false
            });
        }).catch(function(error) {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// 클립보드 복사 폴백 (구형 브라우저)
function fallbackCopyToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showModal({
            title: '링크 복사 완료',
            message: '링크가 복사되었습니다.<br>원하는 곳에 붙여넣기 해보세요!',
            type: 'success',
            confirmText: '확인',
            showCancel: false
        });
    } catch (error) {
        showModal({
            title: '복사 실패',
            message: '링크를 복사할 수 없습니다.<br>수동으로 복사해주세요:<br><br>' + text,
            type: 'warning',
            confirmText: '확인',
            showCancel: false
        });
    }

    document.body.removeChild(textArea);
}

// 이미지 공유
function shareImage() {
    var resultArea = document.getElementById('resultArea');
    var shareBtn = document.getElementById('shareBtn');

    if (!resultArea) {
        alert('공유할 콘텐츠를 찾을 수 없습니다.');
        return;
    }

    // 공유 버튼 임시 숨김
    if (shareBtn) {
        shareBtn.style.display = 'none';
    }

    // 로딩 표시
    Loading.show({
        title: '이미지를 생성하고 있습니다',
        text: '잠시만 기다려주세요...'
    });

    // html2canvas로 DOM을 이미지로 변환
    html2canvas(resultArea, {
        backgroundColor: '#1e1b29',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(function(canvas) {
        // Canvas를 Blob으로 변환
        canvas.toBlob(function(blob) {
            if (!blob) {
                Loading.hide();
                alert('이미지 생성에 실패했습니다.');
                if (shareBtn) shareBtn.style.display = 'flex';
                return;
            }

            // Web Share API 지원 확인
            if (navigator.share && navigator.canShare) {
                var file = new File([blob], 'unveil-result.png', { type: 'image/png' });

                // 공유 가능 여부 확인
                if (navigator.canShare({ files: [file] })) {
                    navigator.share({
                        title: 'Unveil 결과',
                        text: '내 운세 결과를 확인해보세요!',
                        files: [file]
                    }).then(function() {
                        Loading.hide();
                        if (shareBtn) shareBtn.style.display = 'flex';
                    }).catch(function(error) {
                        Loading.hide();
                        if (shareBtn) shareBtn.style.display = 'flex';

                        // 사용자가 취소한 경우 에러 무시
                        if (error.name !== 'AbortError') {
                            // 폴백: 이미지 다운로드
                            downloadImage(blob);
                        }
                    });
                } else {
                    // 파일 공유를 지원하지 않는 경우 다운로드
                    Loading.hide();
                    downloadImage(blob);
                    if (shareBtn) shareBtn.style.display = 'flex';
                }
            } else {
                // Web Share API 미지원 시 다운로드
                Loading.hide();
                downloadImage(blob);
                if (shareBtn) shareBtn.style.display = 'flex';
            }
        }, 'image/png');
    }).catch(function(error) {
        Loading.hide();
        console.error('이미지 생성 오류:', error);
        alert('이미지 생성 중 오류가 발생했습니다.');
        if (shareBtn) shareBtn.style.display = 'flex';
    });
}

// 이미지 다운로드 폴백
function downloadImage(blob) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'unveil-result-' + Date.now() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showModal({
        title: '이미지 저장 완료',
        message: '결과 이미지가 다운로드되었습니다.<br>갤러리에서 확인 후 공유해보세요!',
        type: 'success',
        confirmText: '확인',
        showCancel: false
    });
}