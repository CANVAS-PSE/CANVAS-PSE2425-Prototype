from django.urls import path

from . import views

urlpatterns = [
    path("<int:project_id>/", views.editor, name="editor"),
    path("<int:project_id>/hdf5", views.download, name="download"),
]
