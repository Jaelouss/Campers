import { useRoutes } from "react-router-dom";
import routes from "./routes/routesConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLocations } from "@store/locations/locationsActions";
import type { AppDispatch } from "@store/store";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const element = useRoutes(routes);
  return <>{element}</>;
};
