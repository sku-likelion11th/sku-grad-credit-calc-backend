from django.shortcuts import render
import openpyxl

def upload_file(request):
	if request.method == 'POST':
		file = request.FILES['file']
		wb = openpyxl.load_workbook(file)
		
		sheet = wb.active
		
		a1_value = sheet['J2'].value
		print(a1_value)
		return render(request, 'reader/upload.html', {'message': 'File uploaded successfully.'})
	return render(request, 'reader/upload.html')
