import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Card from "../components/Card/Card";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";
import LatestNews from "../components/News/News";
import Events from "../components/Events/Event";
import Login from "../components/Login/Login";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />

      <section id="promotions">
        <Card />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="menu">
        <Menu />
      </section>

      <section id="news">
        <LatestNews />
      </section>

      <section id="events">
        <Events />
      </section>

      <section id="location">
        <Footer />
      </section>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
