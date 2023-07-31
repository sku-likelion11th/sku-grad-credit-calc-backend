from django.urls import include, path
from . import views

urlpatterns = [
	path('upload/', views.upload_or_result),
    path('upload_file',views.upload_file),
    path('delete_file', views.delete_file),
    path('ge_not_list/', views.ge_not_list),
    path('major_sub_not_list/',views.major_sub_not_list),
    path('major_req_not_list/',views.major_req_not_list),
    path('resub_list/',views.resub_list),
    path('',views.index),
]
