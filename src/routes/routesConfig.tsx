import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Catalog, Details, Home } from "../pages";
import { Layout } from "../components";
import { ROUTES } from "@constants/routes";

const routes: RouteObject[] = [
  {
    path: ROUTES.home.path,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.catalog.path, element: <Catalog /> },
      { path: ROUTES.details.path, element: <Details /> },
    ],
  },
];

export default routes;
