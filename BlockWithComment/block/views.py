from django.shortcuts import render
from .models import Post
from .forms import PostForm

# Create your views here.

def home(request):
    return render(request, 'block/home.html')


def post_list(request):
    posts = Post.objects.all()
    return render(request, 'block/post_list.html', {'posts': posts})