import makeStyles from "@mui/styles/makeStyles";

import React from "react";
import { useProjectDetail } from "./hook/useProjectDetail";
import TitleCard from "../../components/TitleCard";
import { StatusChip } from "../../components/StatusChip";
import { Grid } from "@mui/material";



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
   const {
        project,
  } = useProjectDetail();

  return (
    <div>
        <TitleCard title={`Project: ${project?.title}`}>

          <br />
           By {project?.author}
        </TitleCard>
        <div className={classes.paper}>
            <Grid container>
                {project?.description}
            </Grid>
        </div>
      
    </div>
  );
};

export default ProjectDetailPage;
