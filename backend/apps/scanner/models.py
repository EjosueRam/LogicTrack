from django.db import models

class ScanData(models.Model):

    date_hour = models.DateTimeField(auto_now_add=True)
    linea = models.CharField(max_length=10)
    hu = models.CharField(max_length=50)
    date_hu = models.CharField(max_length=10, blank=True, null=True)
    material = models.CharField(max_length=20, blank=True, null=True)
    motivo = models.CharField(max_length=100, blank=True, null=True)
    submotivo = models.CharField(max_length=100, blank=True, null=True)
    procedencia = models.CharField(max_length=100, blank=True, null=True)
    escaneo = models.CharField(max_length=200)
    comentarios = models.CharField(max_length=100, blank=True, null=True)
    carril = models.CharField(max_length=200, blank=True, null=True)
    colaborador = models.CharField(max_length=100, blank=True, null=True)  # Asegúrate de tener este campo

    def __str__(self):
        return self.hu