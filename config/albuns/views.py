import  json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Album

@csrf_exempt
def api_albuns(request):
    if request.method == "POST":
        dados = json.loads(request.body)
        albuns = Album.objects.create(
            titulo=dados["titulo"],
            artista=dados["artista"],
            ano=dados["ano"],
            avaliacao=dados["avaliacao"],
        )
        return  JsonResponse({"id":album.id}, status=201)

    albuns = list(Album.objects.values())
    return JsonResponse(albuns, safe=False)
