from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static


# This is the main URL configuration for the project.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('main_api.urls')),
    path('accounts/', include('accounts.urls')),
]

# This is a catch-all for the frontend routes. react-router will handle the rest (or other routing libraries)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Print the BASE_DIR
print("BASE_DIR:", settings.BASE_DIR)

# Print the STATIC_ROOT
print("STATIC_ROOT:", settings.STATIC_ROOT)

# Print the STATIC_URL
print("STATIC_URL:", settings.STATIC_URL)

# Print the STATICFILES_DIRS
print("STATICFILES_DIRS:", settings.STATICFILES_DIRS)