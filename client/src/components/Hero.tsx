import React from "react";
import { Container, Button } from "react-bootstrap";
import CollectionsList from "../components/CollectionsList";

const Hero: React.FC = () => {
  return (
    <div className="text-white text-center py-5">
      <Container>
        <h1 className="display-4">Tzolk’in Chocolate</h1>
        <p className="lead">
          Natural chocolate inspired by Mayan culture
        </p>
        <Button className="collections-section" variant="warning" size="lg">
          <CollectionsList />
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
