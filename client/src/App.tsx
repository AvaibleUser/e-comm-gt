import React from "react";
import { RouterProvider } from "react-router-dom";
import { routerStore } from "./store/routes.store";

function App() {
  return <RouterProvider router={routerStore} />;
}

export default App;
