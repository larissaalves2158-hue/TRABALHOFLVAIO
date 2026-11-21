import  json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Album

@csrf_exempt
def api_albuns(request):
    if request.method == "POST":
        dados = json.loads(request.body)
        ano = dados["ano"]
        avaliacao = dados["avaliacao"]

        if ano < 1900 or ano > 2026:
            return JsonResponse(
                {"erro": "O ano deve estar entre 1900 e 2026"},
                status=400
            )

        if avaliacao < 0 or avaliacao > 10:
            return JsonResponse(
                {"erro": "A avaliação deve estar entre 0 e 10"},
                status=400
            )

        albuns = Album.objects.create(
            titulo=dados["titulo"],
            artista=dados["artista"],
            ano=dados["ano"],
            avaliacao=dados["avaliacao"],
        )
        return  JsonResponse({"id":albuns.id}, status=201)

    albuns = list(Album.objects.values())
    return JsonResponse(albuns, safe=False)

def api_resumo(request):
    albuns = list(Album.objects.all())

    total = len(albuns)

    if total > 0:
        media_avaliacao = round(
            sum(album.avaliacao for album in albuns) / total, 2
        )

        melhor = max(
            albuns,
            key=lambda album: album.avaliacao
        ).titulo
    else:
        media_avaliacao = 0.00
        melhor = None

    return JsonResponse({
        "total": total,
        "media_avaliacao": media_avaliacao,
        "melhor": melhor
    })
