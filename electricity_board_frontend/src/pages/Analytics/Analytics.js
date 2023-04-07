import { useEffect } from "react";
import Plot from "react-plotly.js";
import { useDispatch, useSelector } from "react-redux";

import { getAnalyticsRequestAction } from "../../actions/connectionAnalyticsActions";
export const Analytics = () => {
  const dispatch = useDispatch();
  const getAnalyticsRequestState = useSelector(
    (state) => state?.getAnalyticsRequestState
  );
  const { loading, success, data, error } = getAnalyticsRequestState;

  useEffect(() => {
    dispatch(getAnalyticsRequestAction());
  }, []);

  return (
    <>
      {success ? (
        <>
          <div>Analytics</div>
          <Plot
            data={data}
            layout={{ title: "Analytics Chart" }}
            config={{
              displaylogo: false,
              modeBarButtonsToRemove: [
                "toImage",
                "pan2d",
                "hoverClosestCartesian",
                "lasso2d",
                "resetScale2d",
                "hoverCompareCartesian",
                "select2d",
                "hoverClosestPie",
                "zoomIn2d",
                "zoomOut2d",
                "zoom2d",
              ],
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </>
      ) : null}
    </>
  );
};
