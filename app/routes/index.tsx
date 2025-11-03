import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Link, useNavigation } from "@remix-run/react";

import styles from "~/styles/index.css";

export default function Index() {

  const navigation = useNavigation();
  console.log('navigation: ', navigation)
  return (
    <>
      <div>
        <h2>Links</h2>
        <Link to={"/content_example_simple"}>Content loading simple</Link>
        <br />
        <Link to={"contact"}>Contact</Link>
        <br />
        <Link to={"form_examples/single_form"}>Forms examples</Link>

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
