import { useState } from "react";
import Button from "./Button";
import FormItem from "./FormItem";

const AnswerForm = () => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle answer submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem
        label="Answer"
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <Button>Submit Answer</Button>
    </form>
  );
};

export default AnswerForm;
