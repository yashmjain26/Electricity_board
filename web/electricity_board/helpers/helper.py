from electricity_board.models.connection_request import ConnectionRequest
from collections import defaultdict


def get_connection_request(id):
    connection_request = ConnectionRequest.get_connection_request_by_id(id, [])
    if not connection_request:
        return {}
    return {
        "id": connection_request.id,
        "applicant_name": connection_request.applicant_name,
        "gender": connection_request.gender,
        "state": connection_request.state,
        "pincode": connection_request.pincode,
        "district": connection_request.district,
        "ownership": connection_request.ownership,
        "govtid_type": connection_request.govtid_type,
        "id_number": connection_request.id_number,
        "category": connection_request.category,
        "load_applied": connection_request.load_applied,
        "date_of_application": connection_request.date_of_application,
        "Date_of_approval": connection_request.Date_of_approval,
        "modified_date": connection_request.modified_date,
        "status": connection_request.status,
        "reviewer_id": connection_request.reviewer_id,
        "reviewer_name": connection_request.reviewer_name,
        "reviewer_comments": connection_request.reviewer_comments,
    }


def save_connection_request(request_info):
    new_connection_request = ConnectionRequest(
        request_info.get("id", ""),
        request_info.get("applicant_name", ""),
        request_info.get("gender", ""),
        request_info.get("state", ""),
        request_info.get("pincode", ""),
        request_info.get("district", ""),
        request_info.get("ownership", ""),
        request_info.get("govtid_type", ""),
        request_info.get("id_number", ""),
        request_info.get("category", ""),
        request_info.get("load_applied", ""),
        request_info.get("date_of_application", ""),
        request_info.get("Date_of_approval", ""),
        request_info.get("modified_date", ""),
        request_info.get("status", ""),
        request_info.get("reviewer_id", ""),
        request_info.get("reviewer_name", ""),
        request_info.get("reviewer_comments", ""),
    )
    new_connection_request.save()


def update_connection_request(id, request_info):
    old_request_infos = ConnectionRequest.get_connection_request_by_id(id, ["id"])
    if any(
        [
            request_info.get(
                "date_of_application", old_request_infos.date_of_application
            )
            != old_request_infos.date_of_application,
            request_info.get("govtid_type", old_request_infos.govtid_type)
            != old_request_infos.govtid_type,
            request_info.get("id_number", old_request_infos.id_number)
            != old_request_infos.id_number,
        ]
    ):
        return "Can not update predefined data"
    if request_info.get("load_applied") and int(request_info.get("load_applied")) > 20:
        return "Load can not be more then 20"

    if not old_request_infos:
        return "Connection Request not available"

    ConnectionRequest.update_connection_request(id, request_info)


def delete_connection_request(id):
    connection_request = ConnectionRequest.get_connection_request_by_id(id, ["id"])
    if not connection_request:
        return "Entity name not found"
    ConnectionRequest.delete_connection_request(connection_request.id)


def get_connection_requests(**kwargs):
    """
    :param pagination: for paginated result (optional)
    """

    connection_requests = ConnectionRequest.get_connection_request(
        filters=kwargs.get("parameters") or {},
        fields=[],
    )
    items = list(
        map(
            lambda connection_request: {
                "id": connection_request.id,
                "applicant_name": connection_request.applicant_name,
                "gender": connection_request.gender,
                "state": connection_request.state,
                "pincode": connection_request.pincode,
                "district": connection_request.district,
                "ownership": connection_request.ownership,
                "govtid_type": connection_request.govtid_type,
                "id_number": connection_request.id_number,
                "category": connection_request.category,
                "load_applied": connection_request.load_applied,
                "date_of_application": connection_request.date_of_application.strftime(
                    "%d-%m-%Y"
                )
                if connection_request.date_of_application
                else "",
                "Date_of_approval": connection_request.Date_of_approval.strftime(
                    "%d-%m-%Y"
                )
                if connection_request.Date_of_approval
                else "",
                "modified_date": connection_request.modified_date.strftime("%d-%m-%Y")
                if connection_request.modified_date
                else "",
                "status": connection_request.status,
                "reviewer_id": connection_request.reviewer_id,
                "reviewer_name": connection_request.reviewer_name,
                "reviewer_comments": connection_request.reviewer_comments,
            },
            connection_requests.items,
        )
    )

    if kwargs.get("pagination"):
        return {
            "items": items,
            "total_count": connection_requests.total,
            "prev_num": connection_requests.prev_num,
            "next_num": connection_requests.next_num,
            "has_prev": connection_requests.has_prev,
            "has_next": connection_requests.has_next,
            "iter_pages": list(connection_requests.iter_pages()),
        }

    return items


def get_analytics_data():
    connection_requests = ConnectionRequest.get_analytic_data()
    data = defaultdict(dict)
    status_key = set()
    data_key = set()
    for i in connection_requests:
        count = str(i[0])
        month_year = str(i[3]) + "/" +  str(i[1]).zfill(2)
        status = str(i[2])
        data[f"{month_year}"][status] = count
        status_key.add(status)
        data_key.add(f"{i['month']}/{i['year']}")

    
    chart_data = []
    data_key = list(data_key)
    for st in status_key:
        chart_data.append(
            {
                "x": sorted(list(data.keys())),
                "y": [data[j].get(st, 0) for j in sorted(list(data.keys()))],
                "name": st,
                "type": "bar",
            }
        )

    return chart_data
