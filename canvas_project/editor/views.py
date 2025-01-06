from django.shortcuts import render
from django.http import FileResponse

from .models import Project
from django.shortcuts import get_object_or_404
import os
from django.conf import settings


def editor(request, project_id):
    # Return 404 not found if user has no project with this id
    get_object_or_404(Project, id=project_id, owner=request.user)

    return render(request, "editor/editor.html", context={"project_id": project_id})


def download(request, project_id):
    project = get_object_or_404(Project, id=project_id)

    path = os.path.join(settings.BASE_DIR, "static/img/skybox/nx.png")
    file = open(path, "rb")
    response = FileResponse(file)
    response["Content-Type"] = "application/octet-stream"
    response["Content-Disposition"] = (
        f'attachment; filename="{project.name}.{file.name.split('.')[1]}"'
    )
    return response
