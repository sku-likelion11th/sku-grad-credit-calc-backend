// function onClickUpload() {
//   let myInput = document.getElementById("input");
//   myInput.click();
// }
function onClickUpload() {
  let myInput = document.getElementById("input");
  myInput.click();
}

document.getElementById('input').addEventListener('change', function() {
  // 파일이 선택 되었을 때 폼을 자동으로 전송
  document.getElementById('uploadForm').submit();
});

document.getElementById('uploadBtn').addEventListener('click', function(event) {
  // 기본 Submit 이벤트 방지
  event.preventDefault();
});