from django.contrib import admin
from .models import Post, Comment, Like, Tag

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'published')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'content', 'tags')
    list_filter = ('published', 'created_at')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'created_at')
    search_fields = ('content',)

class LikeAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'created_at')
    search_fields = ('post__title', 'user__username')

class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')


admin.site.register(Post, PostAdmin)

admin.site.register(Comment, CommentAdmin)

admin.site.register(Like, LikeAdmin)

admin.site.register(Tag, TagAdmin)