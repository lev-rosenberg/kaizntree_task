from django.urls import path, include, re_path
from django.views.generic import TemplateView


# This is the main URL configuration for the project.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('main_api.urls')),
    path('accounts/', include('accounts.urls')),
]

# This is a catch-all for the frontend routes. react-router will handle the rest (or other routing libraries)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
