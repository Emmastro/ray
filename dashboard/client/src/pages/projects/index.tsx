import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { sliceToPage } from "../../common/util";
import Loading from "../../components/Loading";
import { SearchInput } from "../../components/SearchComponent";
import TitleCard from "../../components/TitleCard";
import { post } from "../../service/requestHandlers";
import { MainNavPageInfo } from "../layout/mainNavContext";
// TODO: Make the job page hooks general purpose so it can be used for the project page as well
import { useProjectList } from "./hook/useProjectList";
import { ProjectRow } from "./ProjectRow";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
  },
  progressError: {
    marginTop: theme.spacing(1),
  },
  helpInfo: {
    marginLeft: theme.spacing(1),
  },
}));

const columns = [
  { label: "Project ID" },
  { label: "Title" },
  { label: "Topic" },
  { label: "Description" },
  { label: "Author" },
  { label: "Date created" },
];

const ProjectList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [projectTitle, setProjecTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTopic, setProjectTopic] = useState("");
  const [projectIsPublic, setProjectIsPublic] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoading, projectList, page, setPage } = useProjectList();

  const {
    items: list,
    // constrainedPage,
    // maxPage,
  } = sliceToPage(projectList, page.pageNo, page.pageSize);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await post("/api/projects", {
        title: projectTitle,
        description: projectDescription,
        topic: projectTopic,
        is_public: projectIsPublic,
      });

      const project = response.data;
      console.log("Project created:", project);

      handleClose();
    } catch (error) {
      console.error("Error creating project", error);
    }
  };

  return (
    <div className={classes.root}>
      <Loading loading={isLoading} />
      <TitleCard title="Project List">
        <TableContainer>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              paddingTop: 1,
            }}
          >
            <SearchInput
              label="Project ID"
              // onChange={(value) => changeFilter("project_id", value)}
            />
            <TextField
              sx={{ width: 120 }}
              label="Page Size"
              size="small"
              defaultValue={10}
              InputProps={{
                onChange: ({ target: { value } }) => {
                  setPage("pageSize", Math.min(Number(value), 500) || 10);
                },
                endAdornment: (
                  <InputAdornment position="end">Per Page</InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Create New Project
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                {columns.map(({ label }) => (
                  <TableCell align="center" key={label}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {label}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((project, index) => {
                const { project_id } = project;
                return <ProjectRow key={project_id} project={project} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TitleCard>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="dense"
            value={projectTitle}
            onChange={(e) => setProjecTitle(e.target.value)}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="dense"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <TextField
            label="Topic"
            name="topic"
            fullWidth
            margin="dense"
            value={projectTopic}
            onChange={(e) => setProjectTopic(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={projectIsPublic}
                onChange={(e) => setProjectIsPublic(e.target.checked)}
                name="isPublic"
              />
            }
            label="Public"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

/**
 * Project page
 */
export const ProjectsLayout = () => {
  return (
    <React.Fragment>
      <MainNavPageInfo
        pageInfo={{
          title: "Projects",
          id: "projects",
          path: "/projects",
        }}
      />
      <Outlet />
    </React.Fragment>
  );
};

export default ProjectList;
