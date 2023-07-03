import ProjectPeopleInfo from "./ProjectPeopleInfo";
import PropTypes from "prop-types";

const ProjectGeneralInfo = ({ project }) => {
  const {
    title,
    description,
    imageUrl,
    client,
    startingDate,
    endingDate,
    people,
  } = project;

  return (
    <div>
      <h1>{title}</h1>
      <p>Project description: {description}</p>
      <img src={imageUrl} alt={title} />
      <p>
        <span>Client: </span>
        {client}
      </p>
      <p>
        <span>Starting date: </span>
        {startingDate}
      </p>
      <p>
        <span>Ending date: </span>
        {endingDate}
      </p>
      <ProjectPeopleInfo people={people} />
    </div>
  );
};

ProjectGeneralInfo.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    startingDate: PropTypes.string.isRequired,
    endingDate: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProjectGeneralInfo;
