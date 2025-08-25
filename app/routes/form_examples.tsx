import { Outlet, NavLink } from "@remix-run/react";
import { type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  console.log("__ execute LOADER route form_examples.tsx");
  return null;
};

const FormExamplesLayout = () => {
  return (
    <>
      <nav>
        <NavLink to={"single_form"}>Simple form</NavLink> --        
      </nav>
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default FormExamplesLayout;
