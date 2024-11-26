from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ScanData

@csrf_exempt
def scan_hu(request):
    if request.method == 'POST':
        hu = request.POST.get('hu')
        if not hu:
            return JsonResponse({'error': 'No HU provided'}, status=400)

        try:
            scan_data = ScanData.objects.get(hu=hu)
            scan_data.motivo = 'Apartado'
            scan_data.procedencia = 'Almacen General'
            scan_data.save()
            return JsonResponse({'message': 'ScanData updated successfully'})
        except ScanData.DoesNotExist:
            return JsonResponse({'error': 'HU not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)