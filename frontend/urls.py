from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
     path('add-note', index),
      path('edit-note/<str:note_id>', index),
    
]