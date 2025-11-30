import { Route, Routes } from "react-router-dom";
import { router } from "./router";
import NavbarLayout from "./layouts/NavbarLayout";
import useAuthGuard from "./hooks/useAuthGuard";

function App() {
  useAuthGuard();
  return (
    <>
      <Routes>
        {router.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<NavbarLayout showNavbar={route.showNavbar}>{route.element}</NavbarLayout>}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
