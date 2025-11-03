import {
  json,
  // redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";

import SingleFormExample from "~/components/SingleFormExample";

const SingleForm = () => {
  return (
    <>
      <SingleFormExample />
    </>
  );
};

export default SingleForm;

export const loader: LoaderFunction = async () => {
  console.log("__ execute LOADER route single_form.tsx");
  return null;
};

// Helper para respuestas 400
// json() -> https://v2.remix.run/docs/utils/json/
const badRequest = <T,>(data: T) => json(data, { status: 400 });

// Validaciones simples
function validateTitle(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0)
    return "El título es requerido.";
  if (value.trim().length < 3)
    return "El título debe tener al menos 3 caracteres.";
  return null;
}
function validateContent(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0)
    return "El contenido es requerido.";
  if (value.trim().length < 5)
    return "El contenido debe tener al menos 5 caracteres.";
  return null;
}

export type ActionData = {
  ok: boolean;
  fields?: { title: string; content: string };
  fieldErrors?: { title?: string | null; content?: string | null };
  formError?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  // Validaciones por campo
  const fieldErrors = {
    title: validateTitle(title), // si no hay error, validateTitle retorna null
    content: validateContent(content), // si no hay error, validateTitle retorna null
  };

  const fields = {
    title: typeof title === "string" ? title : "",
    content: typeof content === "string" ? content : "",
  };

  // Si hay algún error, devolvemos 400 con detalles
  if (fieldErrors.title || fieldErrors.content) {
    return badRequest<ActionData>({ ok: false, fields, fieldErrors });
  }

  try {
    // 🔹 Simular error (para pruebas)
    if (fields.title === "throw") {
      throw new Error("Error simulado 🙂");
    }

    return json<ActionData>({ ok: true, fields });
  } catch (e) {
    console.error("Action error:", e);
    return json<ActionData>(
      {
        ok: false,
        fields,
        formError:
          "Hubo un error general en la aplicación. Intenta nuevamente.",
      },
      { status: 500 }
    );
  }
};
