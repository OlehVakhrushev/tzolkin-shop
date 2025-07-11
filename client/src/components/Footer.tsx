import React from "react";
import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-4" id="contact">
      <Container>
        <p className="mb-0">© 2025 Tzolk’in Chocolate. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
