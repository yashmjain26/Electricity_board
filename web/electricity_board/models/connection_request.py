from dataclasses import dataclass
from sqlalchemy.sql import func
from sqlalchemy.orm import load_only
from electricity_board import db
from sqlalchemy.sql.expression import or_
from sqlalchemy import cast, String


@dataclass
class ConnectionRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    applicant_name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(100))
    state = db.Column(db.String(100))
    pincode = db.Column(db.String(100))
    district = db.Column(db.String(100))
    ownership = db.Column(db.String(100))
    govtid_type = db.Column(db.String(100))
    id_number = db.Column(db.String(100))
    category = db.Column(db.String(100))
    load_applied = db.Column(db.String(100))
    date_of_application = db.Column(db.Date)
    Date_of_approval = db.Column(db.Date)
    modified_date = db.Column(db.Date)
    status = db.Column(db.String(100))
    reviewer_id = db.Column(db.String(100))
    reviewer_name = db.Column(db.String(100))
    reviewer_comments = db.Column(db.String(100))

    __tablename__ = "connection_request"

    def __init__(
        self,
        id,
        applicant_name,
        gender,
        state,
        pincode,
        district,
        ownership,
        govtid_type,
        id_number,
        category,
        load_applied,
        date_of_application,
        Date_of_approval,
        modified_date,
        status,
        reviewer_id,
        reviewer_name,
        reviewer_comments,
    ):
        self.id = id
        self.applicant_name = applicant_name
        self.gender = gender
        self.state = state
        self.pincode = pincode
        self.district = district
        self.ownership = ownership
        self.govtid_type = govtid_type
        self.id_number = id_number
        self.category = category
        self.load_applied = load_applied
        self.date_of_application = date_of_application
        self.Date_of_approval = Date_of_approval
        self.modified_date = modified_date
        self.status = status
        self.reviewer_id = reviewer_id
        self.reviewer_name = reviewer_name
        self.reviewer_comments = reviewer_comments

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_connection_request(cls, filters: dict = {}, fields: list = []):
        _filters = []
        if filters.get("search"):
            _filters.append(
                or_(cast(cls.id, String).contains(func.lower(filters["search"])))
            )

        if filters.get("from"):
            _filters.append(filters["from"] <= cls.date_of_application)

        if filters.get("to"):
            _filters.append(filters["to"] >= cls.date_of_application)
        per_page = int(filters.pop("per_page", 15))
        page = int(filters.pop("page_num", 1))

        query = cls.query.filter(*_filters).order_by(cls.id)
        if fields:
            query = query.with_entities(*fields)

        return query.paginate(per_page=per_page, page=page)

    @classmethod
    def get_connection_request_by_id(cls, id: int, fields: list = []):
        return (
            db.session.query(cls)
            .filter(cls.id == id)
            .options(load_only(*fields))
            .first()
        )

    @classmethod
    def get_analytic_data(cls):
        return (
            db.session.query(
                db.func.count(cls.id).label("count"),
                db.func.extract("month", cls.date_of_application).label("month"),
                cls.status.label("status"),
                db.func.extract("year", cls.date_of_application).label("year"),
            )
            .group_by(
                db.func.extract("month", cls.date_of_application),
                db.func.extract("year", cls.date_of_application),
                cls.status,
            )
            .order_by(
                db.func.extract("year", cls.date_of_application),
                db.func.extract("month", cls.date_of_application),
            )
            .all()
        )

    @classmethod
    def update_connection_request(cls, id, connection_request):
        db.session.query(cls).filter(cls.id == id).update(connection_request)
        db.session.commit()

    @classmethod
    def delete_connection_request(cls, id):
        db.session.query(cls).filter(cls.id == id).delete()
        db.session.commit()
