import React from "react";
import { Product } from "../store/productsSlice";
import { Card } from "react-bootstrap";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <>
      <Card.Text>
        <strong>Weight:</strong> {product.weight}
      </Card.Text>
      <Card.Text>
        <strong>Ingredients:</strong> {product.ingredients}
      </Card.Text>
      <Card.Text>
        <strong>Country:</strong> {product.country}
      </Card.Text>
    </>
  );
};

export default ProductDetails;
