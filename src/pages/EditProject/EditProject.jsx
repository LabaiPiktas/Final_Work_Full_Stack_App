import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getProject } from "../../api/projects";
import NewProject from "../NewProject/NewProject";

const EditProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProject(id)
      .then((response) => {
        setProject(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return <NewProject project={project} />;
};

export default EditProject;
