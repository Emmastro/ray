import {
  Box,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Outlet } from "react-router-dom";
import { sliceToPage } from "../../common/util";
import Loading from "../../components/Loading";
import { SearchInput } from "../../components/SearchComponent";
import TitleCard from "../../components/TitleCard";
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
  const {
    isLoading,
    projectList,
    page,
    setPage,
  } = useProjectList();

  const {
    items: list,
    constrainedPage,
    maxPage,
  } = sliceToPage(projectList, page.pageNo, page.pageSize);

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
             <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // TODO: open a modal form to create a new project
                }}
              >
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
                return (
                  <ProjectRow key={project_id} project={project} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TitleCard>
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
