from django.db import models

class SalesData(models.Model):
    Date_time = models.DateTimeField(auto_now_add=True)
    Sales = models.CharField(max_length=200, blank=True, null=True)
    Material = models.CharField(max_length=100, blank=True, null=True)
    Presentation = models.CharField(max_length=100, blank=True, null=True)
    Coworker = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.Sales