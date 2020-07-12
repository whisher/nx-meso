import React from "react";

// Material
import Container from "@material-ui/core/Container";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="md">
        <p className="m-0 text-white"> &copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
};

export default Footer;
