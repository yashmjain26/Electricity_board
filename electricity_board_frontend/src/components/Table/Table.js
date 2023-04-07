import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import {
  getConnectionRequestAction,
  updateConnectionRequestAction,
} from "../../actions/connectionRequestActions";

import { UpdateRequest } from "./UpdateRequest";
import { Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

export const BasicTable = (props) => {
  const { query } = props;
  const dispatch = useDispatch();
  const getConnectionRequestState = useSelector(
    (state) => state?.getConnectionRequestState
  );
  const { loading, success, data, error } = getConnectionRequestState;

  const updateConnectionRequestState = useSelector(
    (state) => state?.updateConnectionRequestState
  );
  const {
    loading: updateConnectionRequestLoading,
    success: updateConnectionRequestSuccess,
  } = updateConnectionRequestState;

  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [updateConnectionRequest, setUpdateConnectionRequest] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getConnectionRequestAction(
        page,
        query?.search ? query?.search : "",
        query?.from ? query?.from : "",
        query?.to ? query?.to : ""
      )
    );
  }, [page, query]);

  useEffect(() => {
    if (updateConnectionRequestSuccess)
      dispatch(
        getConnectionRequestAction(
          page,
          query?.search ? query?.search : "",
          query?.from ? query?.from : "",
          query?.to ? query?.to : ""
        )
      );
  }, [updateConnectionRequestSuccess]);

  useEffect(() => {
    if (success) console.log(data.items);
  }, [success]);

  const editRequest = (requestName) => {
    setUpdateConnectionRequest(requestName);
    setShowEditRequestModal(true);
  };

  const getTableBody = () => {
    return data.items.map((request, index) => (
      <tr>
        <td>{request.id}</td>
        <td>{request.applicant_name}</td>
        <td>{request.category}</td>
        <td>{request.date_of_application}</td>
        <td>{request.status}</td>
        <td>
          <Button onClick={() => editRequest(request)}> Update </Button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      {success ? (
        <>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Application ID </th>
                <th>Applicant Name</th>
                <th>Category</th>
                <th>Date Of Application</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{getTableBody()}</tbody>
          </Table>
          <PaginationControl
            page={page}
            total={data.total_count}
            changePage={(page) => {
              setPage(page);
            }}
            ellipsis={1}
            limit={15}
            between={4}
          />
          <UpdateRequest
            isOpenModel={showEditRequestModal}
            closeModel={setShowEditRequestModal}
            connectionRequest={updateConnectionRequest}
          />
        </>
      ) : null}
    </>
  );
};
