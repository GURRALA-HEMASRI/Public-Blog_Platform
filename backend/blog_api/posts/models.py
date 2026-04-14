from django.db import models

class Post(models.Model):
    title=models.CharField(max_length=200)
    content=models.TextField()
    excerpt=models.TextField(blank=True)
    author=models.CharField(max_length=100,default='Anonymous')
    image_url=models.URLField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def save(self,*args,**kwargs):
        if not self.excerpt:
            self.excerpt=self.content[:150]
        super().save(*args,**kwargs)

    def __str__(self):
        return self.title
