from traceback import format_tb
from django.contrib import admin
from .models import Post, Comment, Like, Tag, UserProfile
from django.utils.html import format_html 
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


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'avatar')



class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio_preview', 'avatar_preview')
    list_select_related = ('user',)
    search_fields = ('user__username', 'user__email', 'bio')
    readonly_fields = ('avatar_preview',)
    fieldsets = (
        (None, {
            'fields': ('user', ('avatar', 'avatar_preview'), 'bio')
        }),
    )

    def bio_preview(self, obj):
        return obj.bio[:50] + '...' if obj.bio else 'No bio'
    bio_preview.short_description = 'Bio Preview'

    def avatar_preview(self, obj):
        return format_html(  # Fixed: format_html instead of format_tb
            '<img src="{}" style="max-height: 100px; max-width: 100px; border-radius: 50%; object-fit: cover;" />',
            obj.avatar_url
        )
    avatar_preview.short_description = 'Avatar Preview'


admin.site.register(UserProfile, UserProfileAdmin)


admin.site.register(Post, PostAdmin)

admin.site.register(Comment, CommentAdmin)

admin.site.register(Like, LikeAdmin)

admin.site.register(Tag, TagAdmin)

# admin.site.register(UserProfile, UserProfileAdmin)