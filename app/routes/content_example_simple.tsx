import { Outlet, useNavigation } from "@remix-run/react";
import { type LoaderFunction } from "@remix-run/node";

const ContentExampleSimpleLayout = () => {

    const navigation = useNavigation();
  const isLoading = navigation.state === "loading" || navigation.state === "submitting";

  return (
    <>
      <h2>Content Example - simple loading content</h2>
      <div>
         {isLoading && <div>Cargando contenido…</div>}
        <Outlet />
      </div>
    </>
  );
};

export default ContentExampleSimpleLayout;
