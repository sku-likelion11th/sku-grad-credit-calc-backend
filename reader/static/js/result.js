// JavaScript
function setButtonContent() {
    const buttonElement = document.querySelector('.dynamic-button');
    const windowWidth = window.innerWidth;
  
    if (windowWidth >= 768 && windowWidth <= 1000) {
      // 화면 너비가 768px 이상에서 1000px 이하인 경우 버튼 내용 변경
      buttonElement.innerHTML = '데이터삭제';
    } else {
      // 기본 내용으로 되돌리기
      buttonElement.innerHTML = '데이터 삭제하기';
    }
  }
  
  // 윈도우 크기 변경 이벤트 리스너
  window.addEventListener('resize', function() {
    setButtonContent();
  });
  
  // 초기 적용
  setButtonContent();