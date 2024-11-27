from django.db import models

class HuGenerated(models.Model):
    Date_time = models.DateTimeField(auto_now_add=True)
    huGenerated = models.CharField(max_length=200, blank=True, null=True)
    hu = models.CharField(max_length=100, blank=True, null=True)
    material = models.CharField(max_length=100, blank=True, null=True)
    person = models.CharField(max_length=100, blank=True, null=True)
    reason = models.CharField(max_length=100, blank=True, null=True)
    requester = models.CharField(max_length=100, blank=True, null=True)
    huByGenerated = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.huGenerated
