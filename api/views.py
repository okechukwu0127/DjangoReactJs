from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import NotepadSerializer, CreateNotepadSerializer,UpdateNotepadSerializer
from .models import Notepad

from rest_framework.views import APIView
from rest_framework.response import Response

# from django.http import HttpResponse
# Create your views here.

#  def main(request):
    # return HttpResponse('<h1>Hello</h1>')


class NotepadView(generics.ListAPIView): #CreateAPIView
    queryset= Notepad.objects.all()
    serializer_class = NotepadSerializer




class UpdateNoteView2(APIView):  
    serializer_class = NotepadSerializer
    look_up_kwarg = 'note_id'

    def post(self,request,format=None):
        serializers = self.serializer_class(data=request.data)

        #queryset = Notepad.objects.all()
        
        if serializers.is_valid():
            note_id = serializers.data.get('note_id') #request.GET.get(self.look_up_kwarg)
            queryset = Notepad.objects.filter(note_id=note_id)#Notepad.objects.all(note_id=note_id)

            if not queryset.exists():
                return Response({'msg':'Notepas not found :: ','id':serializers.data.get('note_id')}, status = status.HTTP_404_NOT_FOUND)
            
            title = serializers.data.get('title')
            message = serializers.data.get('message')
            owner = serializers.data.get('owner')
            note_id = serializers.data.get('note_id')

            notepad = queryset[0]

            notepad.title = title
            notepad.message = message
            notepad.owner = owner
            notepad.save(update_fields=['title','message','owner'])



            return Response({ 'Note Not Found':'Invalid Note ID'}, status = status.HTTP_404_NOT_FOUND)



        


        return Response({ 'Bad Request':'Invalid data'}, status = status.HTTP_400_BAD_REQUEST)



class UpdateNoteView(APIView):
    serializer_class = UpdateNotepadSerializer
    #look_up_kwarg ='note_id'

    def patch(self, request, format=None):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            title = serializers.data.get('title')
            message = serializers.data.get('message')
            owner = serializers.data.get('owner')
            note_id = serializers.data.get('note_id')

            queryset = Notepad.objects.all(note_id=note_id)

            if not queryset.exists():
                return Response({'msg':'Notepas not found'}, status = status.HTTP_404_NOT_FOUND)
            
            notepad = queryset[0]

            notepad.title = title
            notepad.message = message
            notepad.owner = owner
            notepad.save(update_fields=['title','message','owner'])
            
            return Response(NotepadSerializer(notepad).data, status =status.HTTP_200_OK)



        return Response({ 'Bad Request':'Invalid data','data':serializers.is_valid()}, status = status.HTTP_400_BAD_REQUEST)
        




class GetNotes(APIView):
    serializer_class = NotepadSerializer
    look_up_kwarg = 'note_id'

    def get(self,request,format=None):
        note_id = request.GET.get(self.look_up_kwarg)
        if note_id!= None :
            notepad = Notepad.objects.filter(note_id=note_id)
            if len(notepad)>0:
                data= NotepadSerializer(notepad[0]).data
                return Response(data,status = status.HTTP_200_OK)
            return Response({ 'Note Not Found':'Invalid Note ID'}, status = status.HTTP_404_NOT_FOUND)
        return Response({ 'Bad Request':'Code Parameter not found in request'}, status = status.HTTP_400_BAD_REQUEST)
         

class GetAllNoted(generics.ListAPIView):
    serializer_class = NotepadSerializer
    queryset= Notepad.objects.all()
    #Response(NotepadSerializer(queryset).data,status = status.HTTP_200_OK)
   # def get(self,request,format=None):
    #    notepad= Notepad.objects.all()
        #data= NotepadSerializer(notepad).data

       





class CreateNotePadView(APIView):
   
   serializer_class = CreateNotepadSerializer
   

   def post(self,request,format=None):
       if not self.request.session.exists(self.request.session.session_key):
           self.request.session.create()

       serializer = self.serializer_class(data=request.data)
       queryset = Notepad.objects.all()

       if serializer.is_valid():
            title = serializer.data.get('title')
            message = serializer.data.get('message')
            owner = serializer.data.get('owner')

            notepad=  Notepad(title=title,message=message,owner=owner)
            notepad.save()

            return Response(NotepadSerializer(notepad).data, status =status.HTTP_201_CREATED)

       else:

            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

            

        









 

