import QuestionItem from "./QuestionItem";

const QuestionList = ({ questions }) => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
