# from rest_framework import status, viewsets
# from rest_framework.response import Response
# from .models import Signup
# from .serializers import SignupSerializer

# class SignupViewSet(viewsets.ViewSet):
#     """
#     A simple ViewSet for user signup.
#     """

#     def create(self, request):
#         serializer = SignupSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {"message": "Account created successfully!"},
#                 status=status.HTTP_201_CREATED
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def login(self, request):
#         # ---- Login ----
#         email = request.data.get("email")
#         password = request.data.get("password")

#         try:
#             user = Signup.objects.get(email=email)
#         except Signup.DoesNotExist:
#             return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

#         if not check_password(password, user.password):
#             return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

#         # Store user ID in session (simple auth)
#         request.session["user_id"] = user.id
#         return Response({"message": "Login successful", "user": SignupSerializer(user).data}, status=status.HTTP_200_OK)

#     def logout(self, request):
#         request.session.flush()
#         return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

#     def me(self, request):
#         user_id = request.session.get("user_id")
#         if not user_id:
#             return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

#         user = Signup.objects.get(id=user_id)
#         return Response(SignupSerializer(user).data)

# from rest_framework import status, viewsets
# from rest_framework.response import Response
# from django.contrib.auth.hashers import check_password
# from .models import Signup
# from .serializers import SignupSerializer

# class SignupViewSet(viewsets.ViewSet):
#     # POST /signup/
#     def create(self, request):
#         serializer = SignupSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # POST /login/
#     def login(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")

#         try:
#             user = Signup.objects.get(email=email)
#         except Signup.DoesNotExist:
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

#         if not check_password(password, user.password):
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

#         # Store session
#         request.session["user_id"] = user.id
#         return Response({"message": "Login successful", "user": SignupSerializer(user).data})

#     # GET /me/
#     def me(self, request):
#         user_id = request.session.get("user_id")
#         if not user_id:
#             return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
#         user = Signup.objects.get(id=user_id)
#         return Response(SignupSerializer(user).data)

#     # POST /logout/
#     def logout(self, request):
#         request.session.flush()
#         return Response({"message": "Logged out successfully"})



# from rest_framework import status, viewsets
# from rest_framework.response import Response
# from django.contrib.auth.hashers import check_password
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# from .models import Signup
# from .serializers import SignupSerializer


# @method_decorator(csrf_exempt, name="dispatch")  # ⚠️ For dev only
# class SignupViewSet(viewsets.ViewSet):

#     # POST /signup/
#     def create(self, request):
#         serializer = SignupSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # POST /login/
#     def login(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")

#         try:
#             user = Signup.objects.get(email=email)
#         except Signup.DoesNotExist:
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

#         if not check_password(password, user.password):
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

#         # Store session
#         request.session["user_id"] = user.id
#         request.session.save()   # ensure session is persisted

#         return Response({"message": "Login successful", "user": SignupSerializer(user).data})

#     # GET /me/
#     def me(self, request):
#         user_id = request.session.get("user_id")
#         if not user_id:
#             return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
#         user = Signup.objects.get(id=user_id)
#         return Response(SignupSerializer(user).data)

#     # POST /logout/
#     def logout(self, request):
#         request.session.flush()
#         return Response({"message": "Logged out successfully"})



from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *


@method_decorator(csrf_exempt, name="dispatch")  # ⚠️ For dev only, remove later
class SignupViewSet(viewsets.ViewSet):
    """
    A ViewSet that handles signup, login, profile (me), and logout
    using Django session authentication.
    """

    # POST /signup/
    def create(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # POST /signup/login/
    @action(detail=False, methods=["post"], url_path="login")
    def login(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = Signup.objects.get(email=email)
        except Signup.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, user.password):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Store session
        request.session["user_id"] = user.email
        request.session.save()

        return Response({"message": "Login successful", "user": SignupSerializer(user).data})

    # GET /signup/me/
    @action(detail=False, methods=["get"], url_path="me")
    def me(self, request):
        user_id = request.session.get("user_id")
        if not user_id:
            return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = Signup.objects.get(id=user_id)
        except Signup.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(SignupSerializer(user).data)

    # POST /signup/logout/
    @action(detail=False, methods=["post"], url_path="logout")
    def logout(self, request):
        request.session.flush()
        return Response({"message": "Logged out successfully"})


class ClaimViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Optional: You can restrict access to authenticated users

    def list(self, request):
        """
        Get a list of all claims
        """
        claims = Claim.objects.all()
        serializer = ClaimSerializer(claims, many=True)
        return Response(serializer.data)

    def create(self, request):
        """
        Create a new claim
        """
        serializer = ClaimSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Get details of a specific claim by ID
        """
        try:
            claim = Claim.objects.get(pk=pk)
        except Claim.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClaimSerializer(claim)
        return Response(serializer.data)

    def update(self, request, pk=None):
        """
        Update an existing claim
        """
        try:
            claim = Claim.objects.get(pk=pk)
        except Claim.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClaimSerializer(claim, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Delete a claim
        """
        try:
            claim = Claim.objects.get(pk=pk)
        except Claim.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        claim.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
