from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.contrib.auth.models import User

from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE', '')})


def login_view(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            # Create a session token or JWT here
            return JsonResponse({'message': 'Login successful', 'user_id': user.id})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)



def register_view(request):
    if request.method == 'POST':
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.create_user(username=username, email=email, password=password)
        # Optionally send a verification email here
        return JsonResponse({'message': 'User created', 'user_id': user.id})
