import {
  Form,
  Link,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import {
  json,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";

/** Utilidad para simular demora de una API */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const loader: LoaderFunction = async () => {
  // Simula fetch externo que tarda 2s
  await sleep(2000);

  // payload example
  return json({
    content:
      "Nam imperdiet lacus vitae justo egestas, sed aliquam sem faucibus. Sed quis lorem id nulla molestie consectetur. Integer ut venenatis dolor. Quisque sit amet semper lectus, venenatis rhoncus risus.",
  });
};

const Index = () => {
   const data = useLoaderData(); 

   
  return (
    <>
      {/* Contenido proveniente del loader */}
      <p>
        <strong>Contenido (loader):</strong> {data.content}
      </p>
    </>
  );
};

export default Index;
