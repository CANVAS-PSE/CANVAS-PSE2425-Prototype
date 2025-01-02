from django.shortcuts import render

from django.http import HttpResponse
from .models import Project
from django.shortcuts import get_object_or_404


def editor(request, project_id):
    # Return 404 not found if user has no project with this id
    get_object_or_404(Project, id=project_id, owner=request.user)

    return render(request, "editor/editor.html", context={"project_id": project_id})
