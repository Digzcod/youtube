import React from "react";
import { Provider } from "react-redux";
import { Router, RouterProvider, Outlet } from "react-router-dom";
import Head from "./components/Head";
import Body from "./components/Body";
import ytStore from "./redux/store";
import { youTubeRoutes } from "./router/youTubeRouter";

function App() {
  return (
    <Provider store={ytStore}>
      <section className="cursor-default">
        {/* <Head /> */}
        <RouterProvider router={youTubeRoutes}>
          <Body />
        </RouterProvider>
      </section>
    </Provider>
  );
}

export default App;
