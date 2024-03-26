from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import CustomUserSerializer,UserInfoSerializer

User = get_user_model()

class UserCreate(APIView):
    # Allow any user (authenticated or not) to access this URL path to create a new user
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserUpdate(APIView):
    # Require user to be authenticated to update their details
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Check if the user is trying to update their own profile
        if request.user.pk != user.pk:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = CustomUserSerializer(user, data=request.data, partial=True) # partial=True allows partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Deleting the user's token to log them out
        request.user.auth_token.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
    

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        serializer = UserInfoSerializer(request.user)
        return Response(serializer.data)
    


