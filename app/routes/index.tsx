import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import styles from "~/styles//main.css";

export default function Index() {
  return (
    <>
      <div>
        <h2>Links</h2>
        <Link to={"contact"}>Contact</Link>
      </div>
      <hr />
    </>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

// meta() V1
// Desactivar en remix.config.js: v2_meta: false
// export const meta: MetaFunction = () => {
//   return {
//     title: "Page title",
//     description: "Page descriptiom.",
//   };
// };

// meta() V2
// v2_meta: true
export const meta: MetaFunction = () => {
  return [
    { title: "Page title" },
    {
      name: "description",
      content: "Page description",
    },
  ];
};
