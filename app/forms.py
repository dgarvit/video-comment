from django import forms
from validators import MimetypeValidator
from .models import Video, Comment

class VideoForm(forms.ModelForm):
	class Meta:
		model = Video
		exclude = ['user']
		widgets = {
			'file': forms.FileInput(attrs={'accept':'video/mp4'}),
		}


class CommentForm(forms.ModelForm):
	class Meta:
		model = Comment
		fields = ['comment', 'file']
		widgets = {
			'comment': forms.TextInput(attrs={'placeholder': 'Write a Comment...'}),
		}