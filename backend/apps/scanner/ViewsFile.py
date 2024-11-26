import pandas as pd
import logging
import warnings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ScanData

logging.getLogger('xlrd').setLevel(logging.CRITICAL)


warnings.filterwarnings("ignore", category=UserWarning, module='xlrd')


@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        try:
            print("Request received")  # Log para verificar si la solicitud llega
            file = request.FILES.get('file')
            if not file:
                return JsonResponse({'error': 'No file provided'}, status=400)

            try:
                # Lee el archivo Excel y especifica que las columnas se lean como cadenas
                if file.name.endswith('.xls'):
                    data = pd.read_excel(file, sheet_name=None, dtype=str, engine='xlrd')
                elif file.name.endswith('.xlsx'):
                    data = pd.read_excel(file, sheet_name=None, dtype=str, engine='openpyxl')
                else:
                    return JsonResponse({'error': 'Unsupported file format'}, status=400)

                # Accede directamente a la hoja específica
                df = data.get('2a REVISIONE')
                if df is None:
                    return JsonResponse({'error': 'Sheet "2a REVISIONE" not found'}, status=400)

                print("Excel file read successfully")
                print(f"Sheets in excel file: {list(data.keys())}")
                print(f"Columns in excel file: {df.columns.tolist()}")
                print(f"Data in excel sheet: {df.head()}")
            except ValueError as ve:
                print(f"Error reading excel file: {ve}")
                return JsonResponse({'error': 'Sheet "2a REVISIONE" not found'}, status=400)

            if df.empty:
                print("Excel sheet is empty")
                return JsonResponse({'error': 'Excel sheet is empty'}, status=400)

            df.columns = df.columns.str.strip()
            if 'HUinternal' not in df.columns:
                print("Column 'HUinternal' not found in Excel file")
                return JsonResponse({'error': 'Column "HUinternal" not found'}, status=400)

            hu_internals = df['HUinternal'].tolist()
            print(f"HUinternals extracted: {hu_internals}")

            for hu_internal in hu_internals:
                try:
                    scan_data = ScanData.objects.get(hu=hu_internal)
                    scan_data.motivo = 'apartado'
                    scan_data.procedencia = 'almacen temporal'
                    scan_data.save()
                except ScanData.DoesNotExist:
                    continue

            return JsonResponse({'message': 'Archivo procesado con éxito', 'huInternals': hu_internals})
        except Exception as e:
            print(f"Error processing file: {e}")  # Log para verificar cualquier excepción
            return JsonResponse({'error': 'Error processing file'}, status=500)
    return JsonResponse({'error': 'Método no permitido'}, status=405)