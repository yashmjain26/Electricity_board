import flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_migrate import Migrate

from electricity_board import create_app, db
from electricity_board.controllers.controller import electricity_board_bp

app = create_app()

# db = SQLAlchemy(app)
# migrate = Migrate(app)
# CORS(app)

@app.route("/")
def index():
    return flask.render_template("index.html")


app.register_blueprint(electricity_board_bp, url_prefix="/electricity_boards")
