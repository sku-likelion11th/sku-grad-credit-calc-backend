from django.urls import include, path
from . import views

urlpatterns = [
	path('upload/', views.upload_file)
]
