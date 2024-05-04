import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Lottie from "react-lottie";
import login_animation from "../../assets/Animations/login.json";
import registration_animation from "../../assets/Animations/registration.json";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigateTo = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (data.success) {
        navigateTo("/dashboard_data");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user", 
        }),
      });
      const data = await response.json();
      if (data.success) {
        navigateTo("/dashboard_data");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const validationErrors = {};
    // if (!formData.email) {
    //   validationErrors.email = "Email is required";
    // }
    // if (!formData.password) {
    //   validationErrors.password = "Password is required";
    // }
    // if (isSignUp && !formData.name) {
    //   validationErrors.name = "Name is required";
    // }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission
      if (isSignUp) {
        handleSignUp(); 
      } else {
        handleSignIn(); 
      }
    }
  };
  

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);

  return (
    <div className="container" id="container">
      <div className={`form-container ${isSignUp ? "sign-up" : "sign-in"}`}>
        <form onSubmit={handleSubmit}>
          <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <span>
            {isSignUp
              ? "or use your email for registration"
              : "or use your email password"}
          </span>
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
          {/* {!isSignUp && <a href="#">Forget Your Password?</a>} */}
          <button type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${isSignUp ? "" : "hidden"}`}
          >
            <h2>Already have an account?</h2>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: login_animation,
              }}
              height={300}
              width={300}
            />
            <button className="hidden" id="login" onClick={handleToggle}>
              Sign In
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${isSignUp ? "hidden" : ""}`}
          >
            <h2>Don't have an account ?</h2>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: registration_animation,
              }}
              height={290}
              width={290}
            />
            <button className="hidden" id="register" onClick={handleToggle}>
              Click here to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
