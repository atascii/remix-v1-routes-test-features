import { Link } from "@remix-run/react";

const Contact = () => {
  return (
    <>
      <h2>Contact page</h2>
      <Link to={".."}>Return</Link>
    </>
  );
};

export default Contact;
