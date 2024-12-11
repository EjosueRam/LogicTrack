from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import HUInternal
from .serializer import HUInternalSerializer

@api_view(['GET', 'POST', 'PUT'])
def hu_internal_list(request):
    if request.method == 'GET':
        hu_internals = HUInternal.objects.all()
        serializer = HUInternalSerializer(hu_internals, many=True)
        return Response({'huInternals': serializer.data})

    elif request.method == 'POST':
        hu_internals_data = request.data.get('huInternals', [])
        if not isinstance(hu_internals_data, list):
            return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = HUInternalSerializer(data=hu_internals_data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'HUInternals guardados con éxito'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        hu_internals_data = request.data.get('huInternals', [])
        not_found = []
        for hu_internal in hu_internals_data:
            try:
                hu = HUInternal.objects.get(hu_internal=hu_internal['hu_internal'])
                hu.status = hu_internal['estado']
                hu.save()
                print(f"Updated HUInternal: {hu.hu_internal} to {hu.status}")  # Log para verificar la actualización
            except HUInternal.DoesNotExist:
                not_found.append(hu_internal['hu_internal'])
                print(f"HUInternal not found: {hu_internal['hu_internal']}")  # Log para verificar registros no encontrados

        # Devolver los datos actualizados y los no encontrados
        hu_internals = HUInternal.objects.all()
        serializer = HUInternalSerializer(hu_internals, many=True)
        return Response({'huInternals': serializer.data, 'not_found': not_found}, status=status.HTTP_200_OK)