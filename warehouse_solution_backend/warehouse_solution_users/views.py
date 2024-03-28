from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response({"success": "CSRF token set"})


@method_decorator(csrf_protect, name="dispatch")
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user and user.is_active:
            login(request, user)
            return Response(
                {"detail": "Logged in sucesfully.", "user": username},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"detail": "Incorrect username or password"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Logged out successfully."}, status=status.HTTP_200_OK
        )


class ActiveSession(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        if request.user.is_authenticated:
            group = request.user.groups.first().name
            return Response(
                {
                    "username": request.user.username,
                    "isAuthenticated": True,
                    "group": group
                }
            )
        return Response({"isAuthenticated": False})
