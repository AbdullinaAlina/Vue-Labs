from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, null=True, blank=True)
    age = models.IntegerField()
    address = models.CharField(max_length=255)
    avatar = models.URLField()  # URL to the avatar image
    profile_views = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    pub_date = models.DateField()
    rating = models.IntegerField()
    commentary = models.TextField()
    topic = models.CharField(max_length=100)
    is_liked = models.BooleanField(default=False)
    like_count = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.topic} by {self.user.name}'
