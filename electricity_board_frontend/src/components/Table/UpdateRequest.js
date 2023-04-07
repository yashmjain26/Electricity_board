import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateConnectionRequestAction } from "../../actions/connectionRequestActions";

export const UpdateRequest = (props) => {
  const dispatch = useDispatch();

  const { isOpenModel, closeModel, connectionRequest } = props;
  const [connectionRequestField, setConnectionRequestField] = useState({});

  const updateConnectionRequestState = useSelector(
    (state) => state?.updateConnectionRequestState
  );
  const { loading, success, data, error } = updateConnectionRequestState;

  useEffect(() => {
    setConnectionRequestField({ ...connectionRequest });
  }, [connectionRequest]);

  const handleUpdateBtnClick = (e) => {
    dispatch(updateConnectionRequestAction(connectionRequestField));
  };
  return (
    <Modal
      show={isOpenModel}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit connection Request
        </Modal.Title>
        <button
          type="button"
          className="btn-close disable_after_click"
          id="btn-close"
          onClick={() => closeModel(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Application ID</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Application ID"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  id: e.target.value,
                })
              }
              value={connectionRequestField?.id}
              disabled={true}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">Applicant Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Applicant Name"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  applicant_name: e.target.value,
                })
              }
              value={connectionRequestField?.applicant_name}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Category</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Category"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  category: e.target.value,
                })
              }
              value={connectionRequestField?.category}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">Applicant Gender</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Applicant Name"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  gender: e.target.value,
                })
              }
              value={connectionRequestField?.gender}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Govt ID Type</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Govt ID Type"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  govtid_type: e.target.value,
                })
              }
              value={connectionRequestField?.govtid_type}
              disabled={true}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">ID Number</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Applicant Name"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  id_number: e.target.value,
                })
              }
              value={connectionRequestField?.id_number}
              disabled={true}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Ownership</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Ownership"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  ownership: e.target.value,
                })
              }
              value={connectionRequestField?.ownership}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">Pincode</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Applicant Pincode"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  pincode: e.target.value,
                })
              }
              value={connectionRequestField?.pincode}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Date Of Application</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Date Of Application"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  date_of_application: e.target.value,
                })
              }
              value={connectionRequestField?.date_of_application}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">Date of Approval</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Date of Approval"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  Date_of_approval: e.target.value,
                })
              }
              value={connectionRequestField?.Date_of_approval}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Modified Date</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Modified Date"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  modified_date: e.target.value,
                })
              }
              value={connectionRequestField?.modified_date}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">District</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter District"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  district: e.target.value,
                })
              }
              value={connectionRequestField?.district}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Load Applied</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Load Applied"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  load_applied: e.target.value,
                })
              }
              value={connectionRequestField?.load_applied}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">Status</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Status"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  status: e.target.value,
                })
              }
              value={connectionRequestField?.status}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Reviewer ID</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Reviewer ID"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  reviewer_id: e.target.value,
                })
              }
              value={connectionRequestField?.reviewer_id}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">Reviewer Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Reviewer Name"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  reviewer_name: e.target.value,
                })
              }
              value={connectionRequestField?.reviewer_name}
              disabled={false}
            />
          </div>
        </div>
        <div className="row gx-3 pb-3">
          <div className="form-group col-md-6">
            <label className="field_label">Reviewer Comments</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter Reviewer Comments"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  reviewer_comments: e.target.value,
                })
              }
              value={connectionRequestField?.reviewer_comments}
              disabled={false}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="field_label">State</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Please enter State"
              onChange={(e) =>
                setConnectionRequestField({
                  ...connectionRequestField,
                  state: e.target.value,
                })
              }
              value={connectionRequestField?.state}
              disabled={false}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <div className="w-100 d-flex justify-content-between">
          <Button
            className="btn-sm disable_after_click"
            id="btn_rule"
            onClick={handleUpdateBtnClick}
          >
            {loading && <i className="fas fa-circle-notch fa-spin me-1" />}
            Update Connection Request
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
