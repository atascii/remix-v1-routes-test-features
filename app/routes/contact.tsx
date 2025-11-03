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

export const loader: LoaderFunction = async () => {
  // payload example
  return json({
    content:
      "Nam imperdiet lacus vitae justo egestas, sed aliquam sem faucibus. Sed quis lorem id nulla molestie consectetur. Integer ut venenatis dolor. Quisque sit amet semper lectus, venenatis rhoncus risus.",
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // throw General error
  if (formData.get("general_error") === "true") {
    throw new Error("This is an Error() message!");
  }

  // throw Response error using helper json())
  if (formData.get("response_error") === "true") {
    throw json(
      { message: "This is an error Response message!" },
      { status: 404, statusText: "Not found" }
    );
  }

  // throw Response error using Response object
  if (formData.get("response_error_object") === "true") {
    throw new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return null;
};

const Contact = () => {
  const data = useLoaderData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <h2>Contact page</h2>
      {/* Indicador simple cuando se navega hacia esta ruta */}
      {isLoading && <p>Cargando contenido…</p>}

      {/* Contenido proveniente del loader */}
      <p>
        <strong>Contenido (loader):</strong> {data.content}
      </p>

      <p>
        <Link to={".."}>Back to home</Link>
      </p>
      <hr />
      <Form method="post">
        <button type="submit" name="general_error" value="true">
          Throw a general error
        </button>
        --
        <button type="submit" name="response_error" value="true">
          Throw a specific Response (object) error
        </button>
        --
        <button type="submit" name="response_error_object" value="true">
          Throw a specific Response (object) error using Response object
        </button>
      </Form>
    </>
  );
};

export default Contact;

export function CatchBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>An error ocurred! (CarchBoundary local)</h1>
        <p>Status: {error.status}</p>
        <p>Error message: [{error.data.message || "Data not found."}]</p>
        <p>
          <Link to={"/contact"}>Back to contact</Link>!
        </p>
      </div>
    );
  }
}

export function ErrorBoundary({ error }) {
  return (
    <main>
      <h1>An error ocurred! (ErrorBoundary local)</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Error message: [{error.message}]</p>
      <p>
        <Link to={"/contact"}>Back to contact</Link>!
      </p>
    </main>
  );
}
