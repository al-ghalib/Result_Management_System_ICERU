from rest_framework.renderers import JSONRenderer

class CustomErrorRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        if 'detail' in data:
            response = {
                'status': 'error',
                'message': data['detail']
            }
        else:
            response = {
                'status': 'error',
                'message': 'Validation failed',
                'errors': data
            }

        return super().render(response, accepted_media_type, renderer_context)
