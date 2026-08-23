# Importing from the FastAPI modules
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# Importing from the data file
from data.projects import portfolio

# Initializing the app
app = FastAPI(
    title = "Ganesh",
    redoc_url = False,
    docs_url = False,
    openapi_url = False,
    swagger_ui_oauth2_redirect_url = False,
)

# Mounting the static files
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)

templates = Jinja2Templates(directory="templates")

# HOME ROUTE
@app.get("/", include_in_schema = False)
async def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "portfolio": portfolio
        }
    )
