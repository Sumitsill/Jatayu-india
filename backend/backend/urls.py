"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
# from django.contrib import admin
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from jatayu.views import SignupViewSet

# router = DefaultRouter()
# router.register(r'signup', SignupViewSet, basename='signup')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('admin/', admin.site.urls),
# ]

# from django.urls import path
# from jatayu.views import *

# signup_create = SignupViewSet.as_view({'post': 'create'})
# login_view = SignupViewSet.as_view({'post': 'login'})
# logout_view = SignupViewSet.as_view({'post': 'logout'})
# me_view = SignupViewSet.as_view({'get': 'me'})

# urlpatterns = [
#     path('signup/', signup_create, name='signup'),
#     path('login/', login_view, name='login'),
#     path('logout/', logout_view, name='logout'),
#     path('me/', me_view, name='me'),
# ]

from rest_framework.routers import DefaultRouter
from jatayu.views import *
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'claims', ClaimViewSet, basename='claim')
urlpatterns = [
    path('', include(router.urls)),
    path('signup/login/', SignupViewSet.as_view({'post': 'login'})),
    path('signup/me/', SignupViewSet.as_view({'get': 'me'})),
    path('signup/logout/', SignupViewSet.as_view({'post': 'logout'})),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)