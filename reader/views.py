from django.shortcuts import render
from collections import defaultdict
import openpyxl

def upload_file(request):
	if request.method == 'POST':
		file = request.FILES['file']
		wb = openpyxl.load_workbook(file)
		
		sheet = wb.active
		
		a1_value = sheet['J2'].value
		print(a1_value)

		area = {'교필영역', '교선영역', '전필영역', 
	     		'전선영역', '복필영역', '복전영역', '부전공영역', 
		 		'일선영역', '교직영역', '졸업사정결과'}
		short_area = {'교필', '교선', '전필', 
	     		'전선', '복필', '복전', '부전공', 
		 		'일선', '교직'}
		score_for_grade = {'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0':3.0, 
                     'C+': 2.5, 'C0': 2.0, 'D+':1.5, 'D0': 1.0}

		j = 1
		credit_dict_per_semester = defaultdict(int)  # credit_dict_per_semester[(년도, 학기)] => key값이 튜플로 (년도, 학기)
		credit_dict = defaultdict(int) # 영역별 학점 저장 dict. 36 line에 사용
		area_dict = dict()
		while j < 100: # just for the example
			if sheet[str('A'+str(j))].value in area: # ex) 교필영역이 area집합에 있으면
				j += 2
				ex_dict = defaultdict(int)
    # str('G'+str(j)) => 과목 영역
    # str('I'+str(j)) => 과목명
    # str('U'+str(j)) => 과목 학점(A+, A0 ...)
    # str('S'+str(j)) => 과목 이수 학점(3, 2 ...)
    # str('x'+str(j)) => 수강 년도
    # str('z'+str(j)) => 수강 학기
    
				while sheet[str('G'+str(j))].value in short_area:	# ex) 해당 영역(교필영역)에 수강한 과목이 있으면
					# 일반채플, 제자반 포함해서 {'채플':'int'}로 들은 횟수만큼 int에 저장됨
					if sheet[str('I'+str(j))].value == '채플' or sheet[str('I'+str(j))].value == '채플(제자반)':
						ex_dict['채플'] += 1
					else:
						if sheet[str('S'+str(j))].value != '-': # F맞으면 학점이 하이폰(-)으로 나오나요?
							if sheet[str('U'+str(j))].value != 'P': # 패논패는 계산에서 제외. 하지만 총 이수학점에는 들어감
								ex_dict[sheet[str('I'+str(j))].value] = [int(sheet[str('S'+str(j))].value), sheet[str('U'+str(j))].value]
								credit_dict_per_semester[(sheet[str('x'+str(j))].value, sheet[str('z'+str(j))].value)[0]] += score_for_grade[sheet[str('U'+str(j))].value]*int(sheet[str('S'+str(j))].value)
							
							credit_dict[sheet[str('G'+str(j))].value] += int(sheet[str('S'+str(j))].value)

							
					j += 1	# excel 다음 행으로
				if ex_dict: # if문 사용해서 key값 올바르게 들어감
					area_dict[sheet[str('G'+str(j-1))].value] = ex_dict 
			else:
				j += 1
		print(area_dict)

		return render(request, 'reader/upload.html', {'message': 'File uploaded successfully.'})
	return render(request, 'reader/upload.html')
