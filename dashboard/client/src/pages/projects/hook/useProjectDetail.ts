import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API_REFRESH_INTERVAL_MS } from "../../../common/constants";
import { getProjectDetail } from "../../../service/project";

export const useProjectDetail = () => {
  const params = useParams() as { id: string };
  const [msg, setMsg] = useState("Loading the project detail");
  const [refreshing, setRefresh] = useState(true);
  const { data: project, isLoading } = useSWR(
    ["useProjectDetail", params.id],
    async ([_, jobId]) => {
      try {
        const rsp = await getProjectDetail(jobId);
        return rsp.data;
      } catch (e) {
        setMsg("Project Query Error Please Check ProjectId");
        setRefresh(false);
      }
    },
    { refreshInterval: refreshing ? API_REFRESH_INTERVAL_MS * 100 : 0 },
  );

  return {
    project,
    isLoading,
    msg,
    params,
  };
};
