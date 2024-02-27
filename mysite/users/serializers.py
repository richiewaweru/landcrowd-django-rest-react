from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.validators import UniqueValidator

# Get the CustomUser model
User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Include 'password' in the fields
        extra_kwargs = {
            'username': {
                'validators': [UniqueValidator(queryset=User.objects.all())],
                'required': True,
                'allow_blank': False,
                'min_length': 5
            },
            'email': {
                'required': True,
                'allow_blank': False
            }
        }

    def create(self, validated_data):
        # Create a new CustomUser instance using the validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    def update(self, instance, validated_data):
        # Update and return an existing CustomUser instance, given the validated data
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        instance.save()
        return instance
