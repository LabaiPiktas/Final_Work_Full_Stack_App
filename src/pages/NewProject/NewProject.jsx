import { useContext, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import FormItem from "../../components/FormItem/FormItem";
import { UserContext } from "../../context/UserContext";
import { createProject, updateProject } from "../../api/projects";
import {
  PROJECTS_ROUTE,
  PROJECT_ROUTE,
  USERMENAGEMENT_ROUTE,
} from "../../routes/const";
import { formatDate } from "../../utils/date";
import "../NewProject/NewProject.scss";
import { addUser, deleteUser, updateUser } from "../../utils/user";

const NewProject = ({ project }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [client, setClient] = useState(project?.client || "");
  const [startingDate, setStartingDate] = useState(
    project?.startingDate ? formatDate(project.startingDate) : ""
  );
  const [endingDate, setEndingDate] = useState(
    project?.endingDate ? formatDate(project.endingDate) : ""
  );
  const people = [];
  const isEditing = !!project;

  const navigate = useNavigate();

  const handleAddUser = async () => {
    try {
      // Create a new user object with the required data
      const newUser = {
        name: "John",
        surname: "Doe",
        email: "johndoe@example.com",
        password: "password123",
        // Additional user properties...
      };

      // Call the addUser function to add the new user
      const addedUser = await addUser(newUser);

      console.log("User added:", addedUser);
      // Handle success or update the UI accordingly

      // Redirect to the User Management page
      navigate(USERMENAGEMENT_ROUTE);
    } catch (error) {
      // Handle error or display error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittingProject = {
      userId: user.id,
      title,
      description,
      imageUrl,
      client,
      startingDate,
      endingDate,
      people,
    };

    const saveProject = isEditing ? updateProject : createProject;
    const savingProject = isEditing
      ? { id: project.id, ...submittingProject }
      : submittingProject;

    saveProject(savingProject)
      .then(() => {
        const route = isEditing
          ? generatePath(PROJECT_ROUTE, { id: project.id })
          : PROJECTS_ROUTE;
        navigate(route);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem
        type="text"
        label="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormItem
        type="text"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormItem
        type="url"
        label="Image ULR"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <FormItem
        label="Client"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />
      <FormItem
        type="date"
        label="Starting Date"
        value={startingDate}
        onChange={(e) => setStartingDate(e.target.value)}
      />
      <FormItem
        type="date"
        label="Ending Date"
        value={endingDate}
        onChange={(e) => setEndingDate(e.target.value)}
      />
      <Button className="user_menagement" onClick={handleAddUser}>
        User Menagement
      </Button>
      <Button className="project_edit_button">
        {isEditing ? "Edit" : "Create"} Project
      </Button>
    </form>
  );
};

NewProject.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    startingDate: PropTypes.string.isRequired,
    endingDate: PropTypes.string.isRequired,
  }),
};

export default NewProject;
