from django import forms

from .models import Post, Comment, Like, Tag

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'slug', 'author', 'content', 'tags', 'published', 'image']
        

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

class LikeForm(forms.ModelForm):
    class Meta:
        model = Like
        fields = []

class TagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ['name', 'slug']