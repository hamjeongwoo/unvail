// 공통 유틸리티 함수들
function toQueryString(obj, prefix = '') {
    const query = [];

    for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {
            value.forEach((item, i) => {
                if (typeof item === 'object') {
                    query.push(toQueryString(item, `${newKey}[${i}]`));
                } else {
                    query.push(`${encodeURIComponent(`${newKey}[${i}]`)}=${encodeURIComponent(item)}`);
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            query.push(toQueryString(value, newKey));
        } else {
            query.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(value ?? '')}`);
        }
    }

    return query.join('&');
}

// URL 파라미터에서 포인트 가져오기
function getPointFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var point = urlParams.get('point');
    return point ? parseInt(point) : 100; // 기본값 100
}

// URL 파라미터에서 사용자 정보 가져오기
function getUserFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var userEmail = urlParams.get('user');
    return userEmail ? decodeURIComponent(userEmail) : null;
}

// 현재 사용자 정보 가져오기
function getCurrentUser() {
    return getUserFromURL();
}

// 사용자 정보와 포인트를 포함하여 페이지 이동
function navigateWithUserAndPoint(url, point, userEmail) {
    var params = '?unvail=lec';
    if (userEmail) {
        params += '&user=' + encodeURIComponent(userEmail);
    }
    window.location.href = url + params;
}

// 사용자 UI 업데이트
function updateUserUI() {
    var userEmail = getCurrentUser();
    var loginBtn = document.getElementById('loginBtn');
    var userInfo = document.getElementById('userInfo');
    var userEmailEl = document.getElementById('userEmail');
    
    if (userEmail) {
        // 로그인 상태
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (userEmailEl) userEmailEl.textContent = userEmail;
    } else {
        // 비로그인 상태
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// 현재 포인트 가져오기
function getCurrentPoint() {
    return getPointFromURL();
}

// 포인트와 함께 페이지 이동
function navigateWithPoint(url) {
    navigateWithUserAndPoint(url);
}

// 포인트 UI 업데이트
function updatePointUI() {
    var point = getCurrentPoint();
    var pointDisplay = document.getElementById('pointDisplay');
    if (pointDisplay) {
        pointDisplay.textContent = point;
    }
}

// 포인트 차감 확인
function canConsumePoint(cost) {
    var currentPoint = getCurrentPoint();
    return currentPoint >= cost;
}

// 포인트 차감 후 새로운 포인트 반환
function consumePoint(cost) {
    var currentPoint = getCurrentPoint();
    if (currentPoint >= cost) {
        return currentPoint - cost;
    }
    return currentPoint;
}

// 포인트 부족 모달 표시
function showPointLackModal() {
    var modal = document.getElementById('pointLackModal');
    if (modal) {
        modal.classList.add('modal--active');
    }
}

// 포인트 부족 모달 닫기
function closePointLackModal() {
    var modal = document.getElementById('pointLackModal');
    if (modal) {
        modal.classList.remove('modal--active');
    }
}

// 메인 페이지로 이동
function goToMain() {
    location.href='/'
}

// 뒤로 가기
function goBack() {
    location.history.back();
}

function goToPage(pagesUrl){
    location.href=pagesUrl;
}

// 페이지 로드 시 포인트 UI 업데이트
document.addEventListener('DOMContentLoaded', function() {
    updatePointUI();
    updateUserUI();
});

// 로그인 페이지로 이동
function goToLogin() {
    location.href = '/pages/login';
}

// 결과를 URL에 인코딩하여 저장
function encodeResult(category, type, jsonString) {
    return btoa(category + '#:#' + encodeURIComponent(type) + '#:#' + encodeURIComponent(jsonString));
}

// URL에서 결과 디코딩
function decodeResult(encoded) {
    try {
        var decoded = atob(encoded);
        var parts = decoded.split('#:#');
        return {
            category: parts[0],  // 'saju' or 'tarot'
            type: decodeURIComponent(parts[1]),      // 'daily', 'love', 'one-card' 등
            requestParam: JSON.parse(decodeURIComponent(parts[2]))
        };
    } catch (e) {
        return null;
    }
}

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

// GitHub 로그인
function loginWithGithub() {
    goToPage('/oauth2/authorization/github')
}

// 로그아웃
function handleLogout() {
    showConfirmModal(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      function() {
          localStorage.removeItem('oauthType');
          window.location.href = '/logout';
      }
    );
}


(function (glb) {
    const defaultHeaders = {
        'Content-Type': 'application/json'
        ,'x-isAjax' : 'true'
    };

    const request = function (options) {
        const {url, method = 'GET', data = null, headers = {}} = options;

        const config = {
            method: method.toUpperCase(),
            headers: {...defaultHeaders, ...headers}
        };

        let finalUrl = url;

        if (method.toUpperCase() === 'GET' && data) {
            finalUrl += (finalUrl.includes('?') ? '&' : '?') + toQueryString(data);
        } else if (data && !(data instanceof FormData)) {
            config.body = JSON.stringify(data);
        } else if (data instanceof FormData) {
            delete config.headers['Content-Type'];
            config.body = data;
        }

        return fetch(finalUrl, config).then(async (res) => {
            //if(res.redirected)  glb._ut.nosessionRedirect(res.url)
            if (!res.ok) {
                await apiError(res);
                return;
            }

            const contentType = res.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                return res.json();
            }
            else {
                return res.text();
            }
        });
    }

    async function apiError(res){
        const smallMsg = `방금 전(응답코드:${res.status})`;
        let resJson = '';
        try{
            resJson = await res.json();
        }catch(e){
            const resJson = {
                message : '처리 중 문제가 발생 하였습니다.',
                smallMsg : smallMsg
            }
            if(res.status === 403){
                resJson.message = '권한이 존재 하지 않습니다.';
            }
            showErrorToast(resJson);
            throw new Error(`API Error: ${res.status}`);
        }

        resJson.smallMsg = smallMsg
        showErrorToast(resJson);
        const error = new Error(`API Error: ${resJson.code}`);
        error.status = resJson.code;
        error.data = resJson;
        throw error;
    }

    function showErrorToast(resJson) {
        if(resJson.smallMsg.includes('403')
            || resJson.smallMsg.includes('401')){
            showModal({
                title: '로그인 필요',
                message: '로그인 페이지로 이동 하시겠스니까?',
                type: 'error',
                confirmText: '확인',
                cancelText: '취소',
                showCancel: true,
                onConfirm: function() {
                    goToLogin()
                }
            });
        }else{
            showModal({
                title: resJson.smallMsg,
                message: resJson.message,
                type: 'error',
                confirmText: '확인',
                showCancel: false,
            });
        }
    }

    /**
     * // 단일 요청
     * apiGet('/api/user', { id: 1 })
     *   .then(data => console.log('User:', data))
     *   .catch(err => console.error(err));
     *
     * apiPost('/api/posts', { title: 'New Post' })
     *   .then(data => console.log('Post Created:', data));
     *
     * // 병렬 요청
     * apiBatch([
     *   get('/api/user', { id: 1 }),
     *   post('/api/user', { id: 1 }),
     * ]).then(responses => {
     *   console.log('Batch Responses:', responses);
     * });
     *
     * //multipart/form-data 방식
     * const fileInput = document.querySelector('#fileInput'); // <input type="file" id="fileInput" />
     * const formData = new FormData();
     *
     * // 파일 추가
     * formData.append('file', fileInput.files[0]);
     * // 텍스트 데이터도 함께 추가 가능
     * formData.append('userId', '12345');
     *
     * fetch('/api/upload', {
     *   method: 'POST',
     *   body: formData, // FormData 자체가 Content-Type을 자동 설정
     * })
     * .then(response => response.json())
     * .then(data => {
     *   console.log('Upload success:', data);
     * })
     * .catch(error => {
     *   //error.status, error.data
     *   console.error('Upload failed:', error);
     * });
     *
     * //진행사항 업로드
     * const input = document.querySelector('#fileInput');
     * const formData = new FormData();
     * formData.append('file', input.files[0]);
     *
     * uploadFileWithProgress('/api/upload', formData, percent => {
     *   console.log(`Upload Progress: ${percent}%`);
     * }).then(data => {
     *   console.log('Upload completed:', data);
     * }).catch(err => {
     *   console.error('Upload error:', err);
     * });
     */
    glb._ac = {
        /**
         * get 요청
         * @param url
         * @param params
         * @param headers
         * @returns {Promise<any>}
         */
        get: function (url, params, headers) {
            return request({url, method: 'GET', data: params, headers});
        },
        /**
         * 포스트 요청
         * @param url
         * @param data
         * @param headers
         * @returns {Promise<any>}
         */
        post: function (url, data, headers) {
            return request({url, method: 'POST', data, headers});
        },
        /**
         * put 요청
         * @param url
         * @param data
         * @param headers
         * @returns {Promise<any>}
         */
        put: function (url, data, headers) {
            return request({url, method: 'PUT', data, headers});
        },
        /**
         * delete 요청
         * @param url
         * @param data
         * @param headers
         * @returns {Promise<any>}
         */
        delete: function (url, data, headers) {
            return request({url, method: 'DELETE', data, headers});
        },
        /**
         * api 다건 병렬 요청
         * @param requestList
         * @returns {Promise<{[p: string]: PromiseSettledResult<Awaited<*>>, [p: number]: PromiseSettledResult<Awaited<*>>, [p: symbol]: PromiseSettledResult<Awaited<*>>}>}
         */
        batch: function (requestList) {
            //const promises = requestList.map((req) => request(req));
            return Promise.allSettled(requestList).then((results) =>
              results.map((res, i) => ({
                  request: requestList[i],
                  status: res.status,
                  data: res.status === 'fulfilled' ? res.value : null,
                  error: res.status === 'rejected' ? res.reason : null,
              }))
            )
        },
        uploadFile: function (url, formData) {
            return request({url, method: 'POST', data: formData});
        },
        uploadFileWithProgress: function (url, formData, onProgress) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        onProgress(percent);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Upload failed: ${xhr.status}`));
                    }
                };

                xhr.onerror = () => reject(new Error('Network error'));
                xhr.send(formData);
            });
        },
        /**
         * 윈도우팝업으로 간편 다운로드 처리 (에러 처리 불가)
         * @param url
         * @param paramObj  파라미터객체
         */
        simpleFileDownload: function (url, paramObj){
            const queryStr = _ut.toQueryString(paramObj);
            const windowFeatures = "left=100,top=100,width=0,height=0";
            const resultUrl = queryStr ? `${url}?${queryStr}` : url
            window.open(resultUrl, '_blank', windowFeatures);
        },

        /**
         * 단일 파일 다운로드시 프로그레스 모달 표현 이후에 다운로드 처리
         * - 현재 서버로직상 단일 파일에서만 내려오는 데이터의 전체값을 알수 있기때문에 단일 파일 다운로드만 지원
         * - 서버에서 ContentLength를 response header에 셋팅을 해야함
         * @param url
         * @param paramObj 파라미터객체
         * @param targetElement 프로그레스 모달을 씌울 엘리먼트
         */
        progressFileDownload: function(url, paramObj, targetElement=document.body){
            const loading = glb._ui.modal.loading('다운로드 준비 중... 0%', '', targetElement);
            setTimeout(()=> {
                loading.hide();
            }, 5000);
            const queryStr = _ut.toQueryString(paramObj);
            const resultUrl = queryStr ? `${url}?${queryStr}` : url
            $.ajax({
                url: resultUrl
                , type: 'get'
                , xhrFields: {
                    responseType: 'blob'
                },
                success : (data, textStatus, xhr) => {
                    const blob = new Blob([data]);
                    const disposition = xhr.getResponseHeader('Content-Disposition');
                    const filename = glb._ut.parseContentDisposition(disposition)||'download.file';

                    if (navigator.msSaveBlob) {
                        return navigator.msSaveBlob(blob, url);
                    } else {
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = filename;
                        link.click();
                    }
                },
                xhr: (e) =>{
                    const xhr = $.ajaxSettings.xhr();
                    xhr.onprogress = function(e) {
                        if(e.total){
                            const percent = Math.floor(e.loaded / e.total * 100);
                            if(percent !== 100){
                                loading.updateMessage(`${percent}%`)
                            }else{
                                loading.updateMessage(`다운로드 완료... 100%`)
                                loading.hide();
                            }
                        }else{
                            loading.hide();
                        }
                    };
                    return xhr;
                },
                error: (request, status, error) => {
                    loading.hide();
                    glb._ui.toast.error('다운로드 중 문제가 발생 하였습니다.', '다운로드 오류');
                }
            });
        }
    }
})(window);
