import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import React from "react";
import TitleCard from "../../components/TitleCard";
import { useProjectDetail } from "./hook/useProjectDetail";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  label: {
    fontWeight: "bold",
  },
}));

const ProjectDetailPage = () => {
  const classes = useStyle();
  const { project } = useProjectDetail();

  return (
    <div>
      <TitleCard title={`Project: ${project?.title}`}>
        <br />
        <p className={classes.label}>Project ID: {project?.project_id}</p>
        <p className={classes.label}>Topic: {project?.topic}</p>
        <p className={classes.label}>Created at: {project?.created_at}</p>
        <p className={classes.label}>Author: {project?.author}</p>
        <p className={classes.label}>
          Public: {project?.is_public ? "Yes" : "No"}
        </p>
      </TitleCard>
      <div className={classes.paper}>
        <Grid container>{project?.description}</Grid>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
