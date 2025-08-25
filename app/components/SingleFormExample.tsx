import { Form, useActionData, useNavigation } from "@remix-run/react";
import { type ActionData } from "../routes/form_examples/single_form";

const SingleFormExample = () => {
  const actionData = useActionData<ActionData>();
  
  const navigation = useNavigation();

  const isIdle = navigation.state === "idle";
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  const titleError = actionData?.fieldErrors?.title;
  const contentError = actionData?.fieldErrors?.content;

  // actionData es undefined al cargar por primera vez el formulario
  const defaultTitle = actionData?.fields?.title ?? "";
  const defaultContent = actionData?.fields?.content ?? "";

  return (
    <>
      <h2>Formulario con validación en el action()</h2>
      <p>
        Este formulario hace un post sobre si mismo (misma ruta) ya que no
        inluye el action en etiqueta form. Este post dispara la funcion action()
        en el componente de ruta. Tambien posee validación de los campos en el
        action (server). Se puede simular un error general de aplicación
        colocando "throw" en title.
      </p>

      {/* Panel de éxito */}
      {actionData?.ok && actionData.fields && (
        <div
          style={{
            border: "1px solid",
            marginBottom: "10px",
            padding: "10px",
            background: "#f4fff4",
          }}
          role="status"
        >
          <div>
            <strong>Enviado correctamente</strong>
            <div>
              Title: {actionData.fields.title} <br />
              Content: {actionData.fields.content}
            </div>
          </div>
        </div>
      )}

      {/* Error de formulario (general) si existiera */}
      {actionData?.formError && (
        <div
          style={{
            border: "1px solid",
            marginBottom: 10,
            padding: 10,
            background: "#fff4f4",
          }}
          role="alert"
        >
          {actionData.formError}
        </div>
      )}

      <Form method="post" id="note-form" noValidate>
        <p>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            minLength={3}
            defaultValue={defaultTitle}
            aria-invalid={titleError ? true : undefined}
            aria-describedby={titleError ? "title-error" : undefined}
          />
          {titleError && (
            <em
              id="title-error"
              style={{ color: "crimson", display: "block" }}
              role="alert"
            >
              {titleError}
            </em>
          )}
        </p>
        <p>
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            id="content"
            name="content"
            rows={5}
            required
            minLength={5}
            defaultValue={defaultContent}
            aria-invalid={contentError ? true : undefined}
            aria-describedby={contentError ? "content-error" : undefined}
          />
          {contentError && (
            <em
              id="content-error"
              style={{ color: "crimson", display: "block" }}
              role="alert"
            >
              {contentError}
            </em>
          )}
        </p>
        <div className="form-actions">
          {/* Para ver correctamente los estados, setear Network como "Slow 3G" en devtools */}
          <button disabled={!isIdle}>
            {isSubmitting && "Enviando..."}
            {isLoading && "Cargando..."}
            {isIdle && "Enviar"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default SingleFormExample;
