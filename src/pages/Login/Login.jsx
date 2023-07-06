import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import { REGISTER_ROUTE, MAIN_ROUTE } from "../../routes/const";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const { handleLogin: contextHandleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await axios.post("http://localhost:3000/login", user);
      if (response.data.message) {
        // Login successful
        // Redirect to the main page
        navigate(MAIN_ROUTE);
        window.location.reload();
      } else {
        // Login failed
        // Show error message
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      // Show error message
      setError("An error occurred during login");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLoginSubmit}>
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
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <Button>Login</Button>
          <Link to={REGISTER_ROUTE}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
