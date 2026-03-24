import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { useLocalGovernment } from "./hooks/useLocalGovernment";
import useAuth from "./stores/useAuth";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    useAuth.getState().autoLogin();
  }, []);
  useLocalGovernment();
  return <AppRoutes />;
};

export default App;
