from __future__ import unicode_literals
from validators import MimetypeValidator
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	is_teacher = models.BooleanField(default=False)

	def __str__(self):
		return self.user.username

def upload_to(instance, filename):
    return '%s/%s' % (instance.user.username, filename)


class Video(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)#, validators=[ProfileValidator()])
	title = models.CharField(max_length=100)
	pub_date = models.DateTimeField('date published', auto_now_add=True)
	file = models.FileField(upload_to=upload_to, validators=[MimetypeValidator('video/mp4')])

	def __str__(self):
		return (self.user.username + '/' + self.title)[:40]

