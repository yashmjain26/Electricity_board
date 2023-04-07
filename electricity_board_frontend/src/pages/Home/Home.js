import { useCallback, useState } from "react";

import { Operations } from "../../components/Operations";
import { BasicTable } from "../../components/Table";

export const Home = () => {
  const [query, setQuery] = useState({ search: "" });
  const handleSubmission = useCallback((data) => {
    setQuery({ ...query, ...data });
  }, []);
  return (
    <div>
      <Operations onSubmit={handleSubmission} />
      <BasicTable query={query} />
    </div>
  );
};
