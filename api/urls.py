
from django.urls import path
# from .views import main
from .views import NotepadView,CreateNotePadView,GetNotes,GetAllNoted,UpdateNoteView

urlpatterns = [
    path('home',NotepadView.as_view()),
     path('add-note', CreateNotePadView.as_view()),
     path('get-note', GetNotes.as_view()),
      path('get-all-notes', GetAllNoted.as_view()),
      path('update-note',UpdateNoteView.as_view())
    # path("home", main)
]
