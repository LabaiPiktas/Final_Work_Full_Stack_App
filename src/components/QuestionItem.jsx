const QuestionItem = ({ question }) => {
  return (
    <div>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      {/* Additional question details */}
    </div>
  );
};

export default QuestionItem;
