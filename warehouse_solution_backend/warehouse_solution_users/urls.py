from django.urls import path

from .views import (
    ActiveSession,
    GetCSRFToken,
    UserLogin,
    UserLogout,
)

urlpatterns = [
    path("login/", UserLogin.as_view(), name="user-login"),
    path("logout/", UserLogout.as_view(), name="user-logout"),
    path("active_session/", ActiveSession.as_view(), name="user-view"),
    path("csrf_cookie/", GetCSRFToken.as_view(), name="get-csrf-token"),
]
