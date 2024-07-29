import { ProjectListRsp, UnifiedProject } from "../type/project";
import { get } from "./requestHandlers";

export const getProjectList = () => {
  return get<ProjectListRsp>("api/projects/");
};

export const getProjectDetail = (id: string) => {
  return get<UnifiedProject>(`api/projects/${id}`);
};
