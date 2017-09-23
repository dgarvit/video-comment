from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
	url(r'^index$', views.index, name='index'),	
    url(r'^login/$', auth_views.login, {'template_name': 'app/login.html'}, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^$', views.index, name='index'),
]