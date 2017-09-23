from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
	url(r'^index$', views.index, name='index'),	
    url(r'^login/$', views.login_view, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^signup/$', views.signup, name='signup'),
        url(r'^view/(?P<video_id>[0-9]+)/$', views.view, name='view'),
    url(r'^$', views.index, name='index'),
]