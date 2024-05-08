from django.urls import path
from .views import UserItems, AllItems, UserCategories

urlpatterns = [
    path('items/', UserItems.as_view(), name='user-items'),
    path('items/all/', AllItems.as_view(), name='all-items'),
    path('categories/', UserCategories.as_view(), name='user-categories'),
]