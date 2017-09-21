# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from validators import MimetypeValidator
from django.db import models

# Create your models here.
class Video(models.Model):
	title = models.CharField(max_length=100)
	pub_date = models.DateTimeField('date published', auto_now_add=True)
	file = models.FileField(upload_to='videos', validators=[MimetypeValidator('video/mp4')])

	def __str__(self):
		return self.file.name