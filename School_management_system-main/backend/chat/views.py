from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import ChatMessage
from .serializers import ChatMessageSerializer

class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return all messages where the current user is either sender or recipient
        user = self.request.user
        return ChatMessage.objects.filter(Q(sender=user) | Q(recipient=user))

    def perform_create(self, serializer):
        # Automatically set the sender to the current user
        serializer.save(sender=self.request.user)

    @action(detail=False, methods=['get'], url_path='thread/(?P<contact_id>[0-9]+)')
    def get_thread(self, request, contact_id=None):
        # Retrieve message exchange history with a specific contact user
        user = request.user
        messages = ChatMessage.objects.filter(
            Q(sender=user, recipient_id=contact_id) | 
            Q(sender_id=contact_id, recipient=user)
        ).order_by('timestamp')
        
        # Mark received messages in this thread as read
        messages.filter(recipient=user, is_read=False).update(is_read=True)
        
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
