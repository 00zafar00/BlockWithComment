from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
from .forms import PostForm , ProfileUdateForm
from django.http import HttpResponse
from django.utils.text import slugify
# Create your views here.

def home(request):
    posts = Post.objects.all()
    return render(request, 'block/post_list.html', {'posts': posts})


def post_list(request):
    posts = Post.objects.order_by('-updated_at')
    # posts = Post.objects.select_related('author__profile').order_by('-updated_at')
    # posts = Post.objects.select_related('author').prefetch_related('author__profile').order_by('-updated_at')
    return render(request, 'block/post_list.html', {'posts': posts})

from django.utils.text import slugify
from django.contrib import messages

def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                post = form.save(commit=False)
                post.author = request.user
                post.slug = slugify(post.title)
                post.published = True
                post.save()
                form.save_m2m()  # For many-to-many fields
                messages.success(request, "Post created successfully!")
                print(f"Post created: {post.title} (ID: {post.id})")
                return redirect('root:home')
            except Exception as e:
                print(f"Error saving post: {str(e)}")
                messages.error(request, f"Error creating post: {str(e)}")
        else:
            print("Form errors:")
            for field, errors in form.errors.items():
                print(f"{field}: {', '.join(errors)}")
            messages.error(request, "Please correct the errors below.")
    else:
        form = PostForm()
    
    return render(request, 'block/post_form.html', {'form': form})

def post_edit(request, post_id):
    post =  get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.slug = slugify(post.title)
            post.published = True  # Ensure post is published
            post.save()
            form.save_m2m()
            print("===== Post edited successfully =====")
            return redirect('root:home')
        else:
            print("===== Form errors =====")
            print(form.errors)  # Add this to see validation errors
    else:
        form = PostForm(instance=post)
    return render(request, 'block/post_form.html', {'form': form, 'post': post})

def post_delete(request, post_id):
    return HttpResponse(" post delete ")


def profile(request):
    # return HttpResponse(" profile page ")
    if  request.method == 'POST':
        form = ProfileUdateForm(request.POST,
                                 request.FILES,
                                 instance=request.user.profile)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated successfully!")
            return redirect('root:home')
    else:
        form = ProfileUdateForm(instance=request.user.profile)
    return render(request, 'block/profile.html', {'form': form})