import json
import datetime
from flask import Blueprint, request, jsonify
from electricity_board.helpers.helper import *
from electricity_board.utils.utils import trim_extra_whitespaces_from_string

electricity_board_bp = Blueprint("main_bp", __name__)


@electricity_board_bp.route("/", methods=["GET"])
def get_all_connection():
    """
    Get available connection_request
    :query page_num: Page number | Default: 1
    :query per_page: Per page | Default: 15

    :return: List of available connection_request
    """
    query_string = dict(request.args)
    if query_string.get("search"):
        query_string["search"] = trim_extra_whitespaces_from_string(
            query_string["search"]
        )
    if query_string.get("from"):
        query_string["from"] = datetime.datetime.strptime(
            query_string["from"], "%Y-%m-%d"
        ).date()
    if query_string.get("to"):
        query_string["to"] = datetime.datetime.strptime(
            query_string["to"], "%Y-%m-%d"
        ).date()
        
    connection_request = get_connection_requests(
        parameters=query_string, pagination=True
    )
    return jsonify(connection_request), 200

@electricity_board_bp.route("/analytics", methods=["GET"])
def get_analytics():    
    connection_request = get_analytics_data()
    return jsonify(connection_request), 200


@electricity_board_bp.route("/<int:application_id>", methods=["GET"])
def get_connection_by_application_id(application_id, curr_user):
    data = get_connection_request(application_id)
    if not data:
        return jsonify(error=f"Connection request {application_id} not found"), 400

    return jsonify(data), 200


@electricity_board_bp.route("/update", methods=["POST"])
def update_connection_status():
    try:
        data = json.loads(request.data.decode())
    except json.JSONDecodeError as err:
        return jsonify({"error": err}), 400
    if not data.get("id"):
        return jsonify(error=f"application id not found in json request"), 400

    application_id = data.get("id")
    data.pop("application_id", None)
    
    if data.get("date_of_application"):
        data["date_of_application"] = datetime.datetime.strptime(
            data["date_of_application"], "%d-%m-%Y"
        ).date()
    
    if data.get("Date_of_approval"):
        data["Date_of_approval"] = datetime.datetime.strptime(
            data["Date_of_approval"], "%d-%m-%Y"
        ).date()
    
    if data.get("modified_date"):
        data["modified_date"] = datetime.datetime.strptime(
            data["modified_date"], "%d-%m-%Y"
        ).date()
        
    error_message = update_connection_request(application_id, data)
    if error_message:
        return jsonify(error=error_message), 400
    return jsonify(message=f"Task:{application_id} has been updated"), 200
