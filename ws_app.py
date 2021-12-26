from waitress import serve
from app_dash import app

'''
将dash项目部署:
python ws_app.py
'''
serve(
    app.server,
    port=8888
)
