from flask.cli import FlaskGroup

from electricity_board.app import app
from electricity_board import db
from electricity_board.models.connection_request import ConnectionRequest

import csv

cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("update_db")
def update_db():
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    cli()
