from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .forms import CustomLoginForm
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def login_view(request):
    form = None
    if request.method == 'POST':
        data = json.loads(request.body)
        form = CustomLoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'user': {
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'email': user.email,
                    }
                })
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        else: return JsonResponse({'error': 'Invalid form data'}, status=400)
    else : return  JsonResponse({'error': 'POST request required'}, status=400)


