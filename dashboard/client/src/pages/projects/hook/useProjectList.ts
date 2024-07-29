import { useRef, useState } from "react";
import useSWR from "swr";
import { API_REFRESH_INTERVAL_MS } from "../../../common/constants";

import { getProjectList } from "../../../service/project";
export const useProjectList = () => {
  const [page, setPage] = useState({ pageSize: 10, pageNo: 1 });
  const [msg, setMsg] = useState("Loading the project list...");
  const [isRefreshing, setRefresh] = useState(true);
  const refreshRef = useRef(isRefreshing);
  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefresh(event.target.checked);
  };
  refreshRef.current = isRefreshing;

  // TODO: might not need to use the SWR library here with refresh interval for the list of projects since it's not a frequently updated list
  const { data, isLoading } = useSWR(
    "useProjectList",
    async () => {
      const rsp = await getProjectList();

      if (rsp) {
        setMsg("Fetched projects");

        return rsp.data;
      }
    },
    { refreshInterval: isRefreshing ? API_REFRESH_INTERVAL_MS * 100 : 0 },
  );

  const projectList = data ?? [];

  return {
    projectList,
    msg,
    isLoading,
    isRefreshing,
    onSwitchChange,
    page,
    setPage: (key: string, val: number) => setPage({ ...page, [key]: val }),
  };
};
