from django.db import migrations,models
class Migration(migrations.Migration):
 initial=True
 dependencies=[]
 operations=[migrations.CreateModel(
  name='Post',
  fields=[
   ('id',models.BigAutoField(primary_key=True,serialize=False)),
   ('title',models.CharField(max_length=200)),
   ('content',models.TextField()),
   ('excerpt',models.TextField(blank=True)),
   ('author',models.CharField(max_length=100,default='Anonymous')),
   ('image_url',models.URLField(blank=True)),
   ('created_at',models.DateTimeField(auto_now_add=True)),
   ('updated_at',models.DateTimeField(auto_now=True)),
  ],
 )]
