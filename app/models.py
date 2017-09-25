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
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField(max_length=100)
	pub_date = models.DateTimeField('date published', auto_now_add=True)
	file = models.FileField(upload_to=upload_to)

	def __str__(self):
		return (self.user.username + '/' + self.title)[:40]


class Comment(models.Model):
	video = models.ForeignKey(Video, on_delete=models.CASCADE)
	comment = models.TextField()
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	file = models.FileField(blank=True)
	time = models.DecimalField(max_digits=12, decimal_places=6)

	def __str__(self):
		return (self.video.title[:20] + '/' + self.user.username)
		