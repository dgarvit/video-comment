from django import forms
from validators import MimetypeValidator

class UploadFileForm(forms.Form):
	title = forms.CharField(max_length=50)
	file = forms.FileField(
		widget=forms.FileInput(attrs={'accept':'video/mp4'}),
		validators=[MimetypeValidator('video/mp4')],
		help_text="Upload a mp4 file"
		)