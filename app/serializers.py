from rest_framework import serializers, viewsets
from .models import Comment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username',)


class CommentSerializer(serializers.ModelSerializer):
	user = UserSerializer(many=False)
	class Meta:
		model = Comment
		fields = '__all__'