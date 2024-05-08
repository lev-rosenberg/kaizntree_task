from django.urls import path, include
from .views import SignUpView, GetCSRFToken, LoginView, LogoutView, DeleteUser, GetUsersView, GetCurrentUserView


urlpatterns = [
    path('signup', SignUpView.as_view(), name = 'signup'),
    path('csrf_cookie', GetCSRFToken.as_view(), name = 'get-csrf-cookie'),
    path('login', LoginView.as_view(), name = 'login'),
    path('logout', LogoutView.as_view(), name = 'logout'),
    path('delete', DeleteUser.as_view(), name = 'delete-user'),
    path('users', GetUsersView.as_view(), name = 'get-users'),
    path('user', GetCurrentUserView.as_view(), name = 'get-current-user'),
]

