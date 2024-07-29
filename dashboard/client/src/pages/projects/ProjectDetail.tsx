import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import React from "react";
import { StatusChip } from "../../components/StatusChip";
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
