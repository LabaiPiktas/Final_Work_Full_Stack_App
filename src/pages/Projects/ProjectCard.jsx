import PropTypes from "prop-types";
import "./Projects.scss";

const ProjectCard = ({ title, imageUrl }) => {
  return (
    <div className="project-card">
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <p className="title">{title}</p>
    </div>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ProjectCard;
