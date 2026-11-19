from django.db import models

class Album(models.Model):
    titulo=models.CharField(max_length=100)
    artista=models.CharField(max_length=100)
    ano=models.IntegerField()
    avaliacao=models.FloatField()
    codigo_catalogo=models.CharField(max_length=12, default="CAT-000")

    def __str__(self):
        return self.titulo
    
    
