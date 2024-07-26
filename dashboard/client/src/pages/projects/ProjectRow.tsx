import { Link, TableCell, TableRow, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDateFromTimeMs } from "../../common/formatUtils";
import { UnifiedProject } from "../../type/project";

const useStyles = makeStyles((theme) => ({
  overflowCell: {
    display: "block",
    margin: "auto",
    maxWidth: 360,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  statusMessage: {
    maxWidth: 250,
    display: "inline-flex",
  },
}));

type ProjectRowProps = {
  project: UnifiedProject;
};

export const ProjectRow = ({project} : ProjectRowProps) => {
  const {
    project_id,
    title,
    description,
    topic,
    owner,
    created_at,
  } = project;
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell align="center">
          <Link component={RouterLink} to={project_id.toString()}>
            {project_id}
          </Link>
      </TableCell>
      <TableCell align="center">{title ?? "-"}</TableCell>
      <TableCell align="center">{topic ?? "-"}</TableCell>
      <TableCell align="center">
        <Tooltip title={description}>
          <div className={classes.overflowCell}>{description}</div>
        </Tooltip>
      </TableCell>
      <TableCell align="center">{owner}</TableCell>
      <TableCell align="center">{formatDateFromTimeMs(created_at)}</TableCell>
    </TableRow>
  );
};
