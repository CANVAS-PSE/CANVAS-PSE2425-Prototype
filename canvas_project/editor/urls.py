from django.urls import path

from . import views

urlpatterns = [
    path("<int:project_id>/", views.editor, name="editor"),
]
