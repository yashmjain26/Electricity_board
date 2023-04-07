import { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Operations = (props) => {
  const { onSubmit } = props;

  const [query, setQuery] = useState({});

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      const newQuery = {
        [name]: value,
      };

      if (
        name === "from" &&
        query.to &&
        new Date(newQuery.from) > new Date(query.to)
      ) {
        newQuery["to"] = newQuery.from;
      }

      setQuery((prev) => ({
        ...prev,
        ...newQuery,
      }));
    },
    [query]
  );

  const handleClear = useCallback(() => {
    setQuery({});
    onSubmit({});
  }, [onSubmit]);

  const handleSubmit = useCallback(() => {
    onSubmit(query);
  }, [query, onSubmit]);

  return (
    <Form className="d-flex align-items-center justify-content-end gap-3 mb-3">
      <Form.Group>
        <Form.Label className="text-white">Search</Form.Label>
        <Form.Control
          type="text"
          name="search"
          placeholder="Applicant ID"
          value={query.search ?? ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white">From Date:</Form.Label>
        <Form.Control
          type="date"
          name="from"
          value={query.from ?? ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white">To Date:</Form.Label>
        <Form.Control
          type="date"
          name="to"
          disabled={!query.from}
          min={query.from}
          value={query.to ?? ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        variant="outline-light"
        className="align-self-end"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        variant="outline-light"
        className="align-self-end"
        onClick={handleClear}
      >
        Clear
      </Button>
    </Form>
  );
}
