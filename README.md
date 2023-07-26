# skusku-temp

### 테스트 방법
* python -u manage.py runserver 하면 print가 디버그로 콘솔 창에 출력됨
* 원하는 셀 위치값을 views.py에서 입력한다.
* localhost:8000/reader/upload에서 엑셀 파일을 업로드 하면 됨

### 테스트 방법 2
* pipenv shell 로 가상환경 설치
* 가상환경 내부에서 pip install -r requirements.txt 로 필요한 package 설치
* from ~ import ~ 구문에 빨간 줄 떠있으면 오른쪽 아래 인터프리터를 해당 가상환경으로 변경
* python manage.py runserver 로 서버 구동
* localhost:8000/reader/upload 경로에 자신의 성적 엑셀 업로드
* vscode 터미널에서 교필, 교선, 전필, 전선, 일선이 잘 들어가있는지 확인