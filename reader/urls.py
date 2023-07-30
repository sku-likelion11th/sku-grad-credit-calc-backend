from django.urls import include, path
from . import views

urlpatterns = [
	path('upload/', views.upload_or_result),
    path('upload_file',views.upload_file),
    path('delete_file', views.delete_file),
    path('',views.index),
]
