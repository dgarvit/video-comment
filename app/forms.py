from django import forms
from validators import MimetypeValidator
from .models import Video

class VideoForm(forms.ModelForm):
	class Meta:
		model = Video
		exclude = ['user']
		widgets = {
			'file': forms.FileInput(attrs={'accept':'video/mp4'}),
		}