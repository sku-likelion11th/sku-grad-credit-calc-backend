from django.shortcuts import render
from collections import defaultdict
import openpyxl

def upload_file(request):
	if request.method == 'GET':
		return render(request, 'reader/upload.html')

	file = request.FILES['file']
	wb = openpyxl.load_workbook(file)
	sheet = wb.active
#----------------------------------------------------------------------------------------------
	# already set
	area = {'교필영역', '교선영역', '전필영역', 
			'전선영역', '복필영역', '복전영역', '부전공영역', 
			'일선영역', '교직영역', '졸업사정결과'}
	short_area = {'교필', '교선', '전필', 
			'전선', '복필', '복전', '부전공', 
			'일선', '교직', '채플'}
	score_need_list = {'전필요구학점', '전선요구학점', '복수전공필수요구학점', 
                    '복수전공요구학점', '부전공요구학점'}
	score_for_grade = {'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0':3.0, 
					'C+': 2.5, 'C0': 2.0, 'D+':1.5, 'D0': 1.0}
	info_category = {'major', 'minor', 'student_num', 'grade', 
                  'name', 'score_need', 'socre_did'}
	info_idx = {'A2', 'F2', 'J2', 'M2', 'O2', 'Y2', 'AB2'}
	year = {'2015', '2016', '2017', '2018', '2019', '2020', '2021', 
         '2022', '2023', '2024', '2025', '2026'}
	semester = {'1학기', '2학기'}
 
	# set during runtime
	score_need = defaultdict(int)	# 영역별 요구 학점
	score_did = defaultdict(int)	# 영역별 이수 학점
	subject_did = defaultdict(list)	# 수강한 과목 모두
	subject_didnot = defaultdict(dict) # 수강하지 않은 필수 과목 => set(필수 과목) 해서 discard 하는방식

	semester_grade = defaultdict(dict) # 학년별, 학기별 평점(grade), 이수 학점(score)
	for i in range(1, 6):	# 학년별
		for j in range(1, 3):	# 학기별
			semester_grade[(i, j)] = defaultdict(float)

	semester_subject = defaultdict(dict) # 학년별, 학기별 수강 과목
	for i in range(1, 6):	# 학년별
		for j in range(1, 3):	# 학기별
			semester_subject[(i, j)] = defaultdict(list)

	# a f j m o y ab	
	
	student = dict()
	for i in range(7):
		student[info_category[i]] = sheet[info_idx[i]].value
	
	j = 1
	credit_dict_per_semester = defaultdict(int)  # credit_dict_per_semester[(년도, 학기)] => key값이 튜플로 (년도, 학기)
	credit_dict = defaultdict(int) # 영역별 학점 저장 dict. 36 line에 사용
	area_dict = dict()
	ex = set()
	while j < 150: # 수강 학기 매칭 ex) 1학년 1학기 => 19년도 1학기
		if sheet[str('X'+str(j))].value in year and sheet[str('X'+str(j))].value in semester:
			ex.add((str('X'+str(j)), str('X'+str(j))[0]))	# ex) (2019,1)
		j += 1
	student_semester = []
	for i in ex:
		student_semester.append(ex)
	student_semester.sort()

	semester_dict = dict()
	j = 0
	for i in range(len(student_semester)):
		j += 1
		semester_dict[student_semester[i]] = (str(i//2)+1, j)
		j %= 2

	j = 1
	while j < 150: # just for the example
		if sheet[str('A'+str(j))].value in area: # ex) 교필영역이 area집합에 있으면
			j += 2
			ex_dict = defaultdict(int)
	# 영역  개설학부(과)  이수구분	강좌명	학점  등급	년도  학기  비고	
	# A		B			G		I    S	  U    X	Z	AB

			while sheet[str('G'+str(j))].value in short_area:	# ex) 해당 영역(교필영역)에 수강한 과목이 있으면
				# 일반채플, 제자반 포함해서 {'채플':'int'}로 들은 횟수만큼 int에 저장됨
				if sheet[str('I'+str(j))].value == '채플' or sheet[str('I'+str(j))].value == '채플(제자반)':
					score_did['채플'] += 1
				else:
					if sheet[str('S'+str(j))].value != '-': # F맞으면 학점이 하이폰(-)으로 나오나요?
						if sheet[str('U'+str(j))].value != 'P': # 패논패는 계산에서 제외. 하지만 총 이수학점에는 들어감
							ex_dict[sheet[str('I'+str(j))].value] = [int(sheet[str('S'+str(j))].value), sheet[str('U'+str(j))].value]
							credit_dict_per_semester[(sheet[str('x'+str(j))].value, sheet[str('z'+str(j))].value)[0]] += score_for_grade[sheet[str('U'+str(j))].value]*int(sheet[str('S'+str(j))].value)
						else:
							
						credit_dict[sheet[str('G'+str(j))].value] += int(sheet[str('S'+str(j))].value)
      
				j += 1	# excel 다음 행으로
    
				if sheet[str('G'+str(j+2))].value[:-1].trim() in score_need_list: 
					score_need[sheet[str('G'+str(j+2))].value[:-1].trim()] = int(sheet[str('N'+str(j+2))])
					score_need[sheet[str('P'+str(j+2))].value[:-1].trim()] = int(sheet[str('W'+str(j+2))])
					break	# 요구학점 나오면 해당 영역 종료
     
				
			# if ex_dict: # if문 사용해서 key값 올바르게 들어감
			# 	area_dict[sheet[str('G'+str(j-1))].value] = ex_dict 
		else:
			j += 1
	print(area_dict)




	return render(request, 'reader/upload.html', {'message': 'File uploaded successfully.'})

