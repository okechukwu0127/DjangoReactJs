from rest_framework  import  serializers
from .models import Notepad

class NotepadSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notepad
        fields = ('note_id','title','message','owner','created_at','modified_at')



class CreateNotepadSerializer(serializers.ModelSerializer):

     class Meta:
         model =  Notepad
         fields = ('title','message','owner')



class UpdateNotepadSerializer(serializers.ModelSerializer):
    #note_id =serializers.CharField(validators=[])

    class Meta:
         model =  Notepad
         fields = ('note_id','title','message','owner')