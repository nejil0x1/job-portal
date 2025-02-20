import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>portal</span> app
          </h1>
          <p>
            Our job portal is an easy-to-use platform designed to connect job
            seekers with employers. Job seekers can create profiles, search for
            jobs, and apply directly, while employers can post job openings,
            manage applications, and find top talent. With personalized job
            alerts, real-time notifications, and advanced search filters, the
            platform streamlines the job search and hiring process for everyone.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
