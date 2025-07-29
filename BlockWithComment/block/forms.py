from django import forms

from .models import Post, Comment, Like, Tag

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ['author', 'slug']  # Exclude author and slug, they will be set in the view
        fields = ['title', 'slug',  'content', 'tags', 'published', 'image']
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': "A great person"}),
            'content': forms.Textarea(attrs={'placeholder': "Once upon a time there was a man named Zack, he was very kind and humble person.."}),
            'tags': forms.TextInput(attrs={'placeholder': "e.g. kindness, humility"}),
        }

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