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
		
	def clean_file(self):
		data = self.cleaned_data['file']
		validator = MimetypeValidator('video/mp4')
		validator(data)
		return data


class CommentForm(forms.ModelForm):
	class Meta:
		model = Comment
		fields = ['comment']
		widgets = {
			'comment': forms.TextInput(attrs={'placeholder': 'Write a Comment...'}),
		}