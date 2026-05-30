# importing the required modules
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.exceptions import HTTPException

# importing the modules from other files
from data.projects import projects

# initializing the app
app = FastAPI()

# serve static files
app.mount("/static", StaticFiles(directory = "app/static"), name = "static")

# template directory
templates = Jinja2Templates(directory = "app/templates")

# home route
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        request = request,
        name = "index.html",
        context = {
            "projects": projects
        }
    )

@app.get("/projects/{slug}")
async def project_page(request: Request, slug: str):
    project = next(
        (
            p for p in projects
            if p["slug"] == slug
        ),
        None
    )

    if not project:
        raise HTTPException(
            status_code = 404,
            detail = "Project not found"
        )

    return templates.TemplateResponse(
        request = request,
        name = "project.html",
        context = {
            "project": project
        }
    )
