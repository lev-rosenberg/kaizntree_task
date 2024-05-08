from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer

@method_decorator(csrf_protect, name = 'dispatch')

class GetUsersView(APIView):
  """
    View for getting all users
    Parameters: None
    Returns: list of all users
  """
  # set permissions to allow any since by defauilt they have to be authenticated
  permission_classes = (permissions.AllowAny, )
  
  def get(self, request, format = None):
    users = User.objects.all()
    serialized_users = UserSerializer(users, many = True)
    return Response(serialized_users.data)

class GetCurrentUserView(APIView):
  """
    View for getting the current user
    Parameters: None
    Returns: the current user
  """  
  def get(self, request, format = None):
    user = request.user
    print(user)
    user = User.objects.get(id = user.id)
    serialized_user = UserSerializer(user)
    return Response(serialized_user.data)
  
class SignUpView(APIView):
  """
    View for signing up a new user
    Parameters: username, password
    Returns: success message if user is created successfully
  """
  # set permissions to allow any since by defauilt they have to be authenticated
  permission_classes = (permissions.AllowAny, )
  
  def post(self, request, format = None):
    data = self.request.data
    username = data['username']
    password = data['password']
    try:
      if User.objects.filter(username = username).exists():
        return Response({'error': 'Username already exists'})
      else:
        if len(password) < 6:
          return Response({'error': 'Password must be at least 6 characters'})
        else:
          user = User.objects.create_user(username = username, password = password)
          user.save()
          return Response({'success': 'User created successfully'})
    except:
      return Response({'error': 'An error occurred signing up the user'})

@method_decorator(csrf_protect, name = 'dispatch')
class LoginView(APIView):
  """
    View for logging in a user
    Parameters: username, password
    Returns: success message if user is logged in successfully
  """
  # set permissions to allow any since by defauilt they have to be authenticated
  permission_classes = (permissions.AllowAny, )
  
  def post(self, request, format = None):
    data = self.request.data
    username = data['username']
    password = data['password']
    user = authenticate(username = username, password = password)
    try:
      if user is not None:
        login(request, user)
        return Response({'success': 'User logged in', 'username': username})
      else:
        return Response({'error': 'Invalid credentials'})
    except:
      return Response({'error': 'An error occurred logging in the user'})

class LogoutView(APIView):
  """
    View for logging out a user
    Parameters: None
    Returns: success message if user is logged out successfully
  """
  # set permissions to allow any since by defauilt they have to be authenticated
  permission_classes = (permissions.AllowAny, )

  def post(self, request, format = None):
    try:
      logout(request)
      return Response({'success': 'User logged out'})
    except:
      return Response({'error': 'An error occurred logging out the user'})
    
    
class DeleteUser(APIView):
  """
    View for deleting a user
    Parameters: userid
    Returns: success message if user is deleted successfully    
  """
  # set permissions to allow any since by default they have to be authenticated
  permission_classes = (permissions.AllowAny, )
  
  def delete(self, request, format=None):
    try:
      userid = request.data.get('userid')
      user = User.objects.filter(id=userid)
      if user.exists():
        user.delete()
        return Response({'success': 'User deleted'})
      else:
        return Response({'error': 'User not found'})
    except:
      return Response({'error': 'An error occurred deleting the user'})
    
@method_decorator(ensure_csrf_cookie, name = 'dispatch')
class GetCSRFToken(APIView):
  """
    View for getting CSRF token
    Parameters: None
    Returns: success message if CSRF token is set (token is stored in the cookie)
  """
  # set permissions to allow any since by defauilt they have to be authenticated
  permission_classes = (permissions.AllowAny, )
  
  def get(self, request, format = None):
    return Response({'success': 'CSRF cookie set'})
  