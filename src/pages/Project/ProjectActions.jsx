import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { deleteProject } from "../../api/projects";
import { PROJECTS_ROUTE, EDIT_PROJECT_ROUTE } from "../../routes/const";

const ProjectActions = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteProject(id)
      .then(() => {
        navigate(PROJECTS_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    const path = generatePath(EDIT_PROJECT_ROUTE, { id });
    navigate(path);
  };

  return (
    <div className="project-actions">
      <Button variant="outlined" onClick={handleEdit}>
        Edit Project
      </Button>
      <Button color="error" onClick={handleDelete}>
        Delete Project
      </Button>
    </div>
  );
};

ProjectActions.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProjectActions;
