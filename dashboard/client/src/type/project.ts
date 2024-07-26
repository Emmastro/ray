export type UnifiedProject = {
  project_id: string;
  title: string;
  description: string;
  topic: string;
  is_public: boolean;
  author: string;
  owner: string;
  created_at: number;
};

export type ProjectDetailRsp = {
  data: {
    detail: UnifiedProject;
  };
  msg: string;
  result: boolean;
};

export type ProjectListRsp = UnifiedProject[];
