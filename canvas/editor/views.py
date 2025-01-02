from django.shortcuts import render

from django.http import HttpResponse


def editor(request, project_id):
    return render(request, "editor/editor.html")
