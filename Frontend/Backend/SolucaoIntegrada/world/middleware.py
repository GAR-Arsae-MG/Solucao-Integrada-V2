
from world.services import fetchSaveIPCA

class IPCAMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        fetchSaveIPCA()
        response = self.get_response(request)
        return response

