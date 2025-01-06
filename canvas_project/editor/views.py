from django.shortcuts import render
from django.http import FileResponse

from .models import Project
from django.shortcuts import get_object_or_404
import os
from django.conf import settings


def editor(request, project_name):
    # Return 404 not found if user has no project with this id
    project = get_object_or_404(Project, name=project_name, owner=request.user)

    return render(
        request,
        "editor/editor.html",
        context={"project_id": project.pk, "project_name": project.name},
    )


def download(request, project_name):
    project = get_object_or_404(Project, name=project_name)

    path = os.path.join(settings.BASE_DIR, "static/img/skybox/nx.png")
    file = open(path, "rb")
    response = FileResponse(file)
    response["Content-Type"] = "application/octet-stream"
    response["Content-Disposition"] = (
        f'attachment; filename="{project.name}.{file.name.split('.')[1]}"'
    )
    return response
