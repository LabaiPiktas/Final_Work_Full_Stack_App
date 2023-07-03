import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import FormItem from "../../components/FormItem/FormItem";
import { LOGIN_ROUTE } from "../../routes/const";
import "../Login/Login.scss";

// DRY - dont repeat yourself

const Register = () => {
  const { handleRegister } = useContext(UserContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, surname, date, email, password };
    handleRegister(user);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormItem
        label="Name"
        containerClassname="form-item"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormItem
        label="Surname"
        containerClassname="form-item"
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />
      <FormItem
        label="Birth Date"
        containerClassname="form-item"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <FormItem
        label="Email"
        containerClassname="form-item"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormItem
        label="Password"
        containerClassname="form-item"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="button-container">
        <Button>Register</Button>
        <Link to={LOGIN_ROUTE}>Back to Login</Link>
      </div>
    </form>
  );
};

export default Register;
