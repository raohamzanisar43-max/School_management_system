from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    sender_name = serializers.ReadOnlyField(source='sender.first_name')
    recipient_username = serializers.ReadOnlyField(source='recipient.username')
    recipient_name = serializers.ReadOnlyField(source='recipient.first_name')

    class Meta:
        model = ChatMessage
        fields = [
            'id', 'sender', 'sender_username', 'sender_name', 
            'recipient', 'recipient_username', 'recipient_name', 
            'message', 'timestamp', 'is_read'
        ]
        read_only_fields = ['sender', 'timestamp']
