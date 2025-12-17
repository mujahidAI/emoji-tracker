"""
URL configuration for emoji_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
urlpatterns = [
    # API URLs
    path("api/", include('emoji.routers')),
    # Admin site URL
    path('admin/', admin.site.urls),
    # Main application URLs
    path('',include('emoji.urls')),
]
"""
URL patterns for the emoji_tracker project.

This list routes URLs to their respective views or other URL configurations.
- `admin/`: Django admin site.
- `api/`: API endpoints defined by the 'emoji' app's routers.
- `''`: Root URL, includes URLs from the 'emoji' app.
"""
