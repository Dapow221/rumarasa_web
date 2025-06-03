import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Card from "./components/Card/Card.jsx";
import About from "./components/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Menu from "./components/Menu/Menu.jsx";
import LatestNews from "./components/News/News.jsx";
import Events from "./components/Events/Event.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Card />
      <About />
      <Menu />
      <LatestNews />
      <Events />
      <Footer />
    </div>
  );
};

export default App;
