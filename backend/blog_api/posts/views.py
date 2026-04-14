from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from .models import Post
from .serializers import PostSerializer

class PostViewSet(ModelViewSet):
    queryset=Post.objects.all().order_by('-created_at')
    serializer_class=PostSerializer
    filter_backends=[SearchFilter]
    search_fields=['title','content','author']
