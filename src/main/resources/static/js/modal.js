/**
 * 공통 모달 시스템
 *
 * 사용 예시:
 * showModal({
 *   title: '알림',
 *   message: '작업이 완료되었습니다.',
 *   type: 'success',
 *   confirmText: '확인',
 *   cancelText: '취소',
 *   showCancel: true,
 *   onConfirm: function() { console.log('확인'); },
 *   onCancel: function() { console.log('취소'); }
 * });
 */

var Modal = {
    // 현재 활성화된 모달 콜백
    _currentCallbacks: null,

    /**
     * 모달 표시
     * @param {Object} options 모달 옵션
     * @param {string} options.title - 모달 제목
     * @param {string} options.message - 모달 메시지
     * @param {string} options.type - 모달 타입 (info, success, warning, error)
     * @param {string} options.confirmText - 확인 버튼 텍스트 (기본: '확인')
     * @param {string} options.cancelText - 취소 버튼 텍스트 (기본: '취소')
     * @param {boolean} options.showCancel - 취소 버튼 표시 여부 (기본: true)
     * @param {Function} options.onConfirm - 확인 버튼 콜백
     * @param {Function} options.onCancel - 취소 버튼 콜백
     * @param {Array} options.customButtons - 커스텀 버튼 배열 [{text, class, onClick}]
     */
    show: function(options) {
        var modal = document.getElementById('commonModal');
        if (!modal) {
            console.error('공통 모달 엘리먼트를 찾을 수 없습니다. HTML에 모달을 추가해주세요.');
            return;
        }

        // 기본값 설정
        var config = {
            title: options.title || '알림',
            message: options.message || '',
            type: options.type || 'info',
            confirmText: options.confirmText || '확인',
            cancelText: options.cancelText || '취소',
            showCancel: options.showCancel !== undefined ? options.showCancel : true,
            onConfirm: options.onConfirm || null,
            onCancel: options.onCancel || null,
            customButtons: options.customButtons || null
        };

        // 콜백 저장
        this._currentCallbacks = {
            onConfirm: config.onConfirm,
            onCancel: config.onCancel
        };

        // 모달 내용 업데이트
        var titleEl = modal.querySelector('.modal__title');
        var messageEl = modal.querySelector('.modal__message');
        var iconEl = modal.querySelector('.modal__icon');
        var confirmBtn = modal.querySelector('.modal__btn-confirm');
        var cancelBtn = modal.querySelector('.modal__btn-cancel');

        // 아이콘 설정
        var icons = {
            'info': '💬',
            'success': '✓',
            'warning': '⚠',
            'error': '✕'
        };

        if (iconEl) {
            iconEl.textContent = icons[config.type] || icons.info;
            iconEl.className = 'modal__icon modal__icon--' + config.type;
        }

        // 텍스트 설정
        if (titleEl) titleEl.textContent = config.title;
        if (messageEl) messageEl.innerHTML = config.message;

        var buttonsContainer = modal.querySelector('.modal__buttons');

        // 커스텀 버튼이 있는 경우
        if (config.customButtons && config.customButtons.length > 0) {
            buttonsContainer.innerHTML = '';

            config.customButtons.forEach(function(btn) {
                var button = document.createElement('button');
                button.className = btn.class || 'btn btn--primary';
                button.textContent = btn.text || '버튼';
                button.onclick = function() {
                    Modal.hide();
                    if (btn.onClick) {
                        btn.onClick();
                    }
                };
                buttonsContainer.appendChild(button);
            });

            // 취소 버튼 추가
            if (config.showCancel) {
                var cancelButton = document.createElement('button');
                cancelButton.className = 'btn btn--secondary modal__btn-cancel';
                cancelButton.textContent = config.cancelText;
                cancelButton.onclick = modalCancel;
                buttonsContainer.appendChild(cancelButton);
            }
        } else {
            // 기본 버튼 사용
            buttonsContainer.innerHTML = '';

            var cancelButton = document.createElement('button');
            cancelButton.className = 'btn btn--secondary modal__btn-cancel';
            cancelButton.textContent = config.cancelText;
            cancelButton.style.display = config.showCancel ? 'block' : 'none';
            cancelButton.onclick = modalCancel;

            var confirmButton = document.createElement('button');
            confirmButton.className = 'btn btn--primary modal__btn-confirm';
            confirmButton.textContent = config.confirmText;
            confirmButton.onclick = modalConfirm;

            buttonsContainer.appendChild(cancelButton);
            buttonsContainer.appendChild(confirmButton);
        }

        // 모달 표시
        modal.classList.add('modal--active');
        document.body.style.overflow = 'hidden';
    },

    /**
     * 모달 숨기기
     */
    hide: function() {
        var modal = document.getElementById('commonModal');
        if (modal) {
            modal.classList.remove('modal--active');
            document.body.style.overflow = '';
        }
        this._currentCallbacks = null;
    },

    /**
     * 확인 버튼 클릭 핸들러
     */
    confirm: function() {
        if (this._currentCallbacks && this._currentCallbacks.onConfirm) {
            this._currentCallbacks.onConfirm();
        }
        this.hide();
    },

    /**
     * 취소 버튼 클릭 핸들러
     */
    cancel: function() {
        if (this._currentCallbacks && this._currentCallbacks.onCancel) {
            this._currentCallbacks.onCancel();
        }
        this.hide();
    }
};

// 전역 함수로 노출 (레거시 코드 호환성)
function showModal(options) {
    Modal.show(options);
}

function hideModal() {
    Modal.hide();
}

function modalConfirm() {
    Modal.confirm();
}

function modalCancel() {
    Modal.cancel();
}