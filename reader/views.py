from django.shortcuts import render
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

		j = 1
		area_dict = dict()
		while j < 100: # just for the example
			if sheet[str('A'+str(j))].value in area: # ex) 교필영역이 area집합에 있으면
				j += 2
				ex_dict = dict()
				while sheet[str('G'+str(j))].value in short_area:	# ex) 해당 영역(교필영역)에 수강한 과목이 있으면
					# 일반채플, 제자반 포함해서 {'채플':'int'}로 들은 횟수만큼 int에 저장됨
					if sheet[str('I'+str(j))].value == '채플' or sheet[str('I'+str(j))].value == '채플(제자반)':
						try:
							ex_dict['채플'] += 1
						except:
							ex_dict['채플'] = 1
					else:
						if sheet[str('S'+str(j))].value != '-':
							ex_dict[sheet[str('I'+str(j))].value] = int(sheet[str('S'+str(j))].value)
					j += 1	# excel 다음 행으로
				if ex_dict: # if문 사용해서 key값 올바르게 들어감
					area_dict[sheet[str('G'+str(j-1))].value] = ex_dict 
			else:
				j += 1
		print(area_dict)

		return render(request, 'reader/upload.html', {'message': 'File uploaded successfully.'})
	return render(request, 'reader/upload.html')
