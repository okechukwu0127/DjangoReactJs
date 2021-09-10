from django.db import models

# Create your models here.
class Notepad(models.Model):
        note_id = models.AutoField(primary_key=True,unique=True)
        title = models.CharField(max_length=200, default="", unique=True)
        message = models.CharField(max_length=300,default="", unique=False )
        owner = models.CharField(max_length=200, default="", unique=False)
        created_at = models.DateTimeField(auto_now_add=True)
        modified_at = models.DateTimeField(auto_now=True)

        #class Meta:
         #   abstract = True


