# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, HttpResponse, redirect
from .forms import VideoForm, CommentForm
from .models import Video, Profile, Comment
from .serializers import CommentSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse

def login_view(request):
	if request.user.is_authenticated:
		return redirect('index')
	try:
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			return redirect(index)

		else:
			return render(request, 'app/login.html', {'error' : True})

	except:
		return render(request, 'app/login.html')

def logout_view(request):
	logout(request)
	return redirect('index')


@login_required
def upload(request):
	profile = Profile.objects.get(user=request.user)
	if profile.is_teacher == False:
		return HttpResponse('Not a teacher')

	if request.method == 'POST':
		form = VideoForm(request.POST, request.FILES)
		if form.is_valid():
			video = form.save(commit=False)
			video.user = request.user
			video.save()
			return HttpResponse('Success')
		else:
			return render(request, 'app/upload.html', {'form': form})


	else:
		form = VideoForm()
		return render(request, 'app/upload.html', {'form': form})


def index(request):
	videos = Video.objects.all()
	return render(request, 'app/index.html', {'videos': videos})


def signup(request):
	if request.user.is_authenticated:
		return redirect('index')
	form = UserCreationForm()
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			form.save()
			user = form.save(commit=False)
			profile = Profile(user=user)
			profile.save()
			return HttpResponse("Success")
	return render(request, 'app/signup.html', {'form': form})


def view(request, video_id):
	if request.method == 'POST':
		try:
			text = request.POST['comment']
			time = int(float(request.POST['time']))
			print type(time)
			video = Video.objects.get(id=video_id)
			user = request.user
			comment = Comment(comment=text, time=time, video=video, user=user)
			comment.save()
		except:
			pass;
		video = Video.objects.get(id=video_id)
		comments = Comment.objects.filter(video=video).order_by('time')
		serializer = CommentSerializer(comments, many=True)
		return JsonResponse(serializer.data, safe=False)

	video = Video.objects.get(id=video_id)
	form = CommentForm()
	comments = Comment.objects.filter(video=video).order_by('time')
	return render(request, 'app/view.html',
	{
	 	'video': video,
		'form':  form,
	})