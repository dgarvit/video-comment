# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, HttpResponse, redirect
from .forms import UploadFileForm

def login_view(request):
	try:
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			return HttpResponse("Hey!" + user.username);

		else:
			return HttpResponse("Invalid user.")

	except:
		return render(request, 'app/login.html')

def logout_view(request):
	logout(request)
	return redirect(login)


def upload(request):
	if request.method == 'POST':
		form = UploadFileForm(request.POST, request.FILES)
		if form.is_valid():
			#handle_uploaded_file(request.FILES['file'])
			return HttpResponse('Success')

		else:
			return render(request, 'app/upload.html', {'form': form})


	else:
		form = UploadFileForm()

		return render(request, 'app/upload.html', {'form': form})
