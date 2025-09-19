import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {FloatingWhatsApp} from "./components/FloatingWhatsapp";

const App = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Outlet />
      <FloatingWhatsApp />
    </>
  );
};

export default App;