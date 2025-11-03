import type { LinksFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,  
  Link,
  useRouteError, isRouteErrorResponse
} from "@remix-run/react";




import globalStyles from  "~/styles/global.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Intercepta todos los Repsonse errors generales de la aplicación
export function CatchBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>An error ocurred! (CarchBoundary general)</h1>
        <p>Status: {error.status}</p>
        <p>Error message: {error.data.message || 'Data not found.'} </p>
        <p>
          <Link to={"/"}>Back to safety</Link>!
        </p>
      </div>
    );
  }
}

// Intercepta todos los errores generales de la aplicación
export function ErrorBoundary({error}) {
return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>An error ocurred!</title>
      </head>
      <body>
        <main>
          <h1>An error ocurred! (ErrorBoundary general)</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>Error message: [{error.message}]</p>
          <p><Link to={'/'}> Back to safety</Link>!</p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};
