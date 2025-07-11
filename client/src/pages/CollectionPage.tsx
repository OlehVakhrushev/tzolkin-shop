// src/pages/CollectionPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  ingredients: string;
}

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/collections/${id}`);
        setCollection(res.data);
      } catch (err) {
        setError("Failed to load collection");
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [id]);

  const handleAddToCart = () => {
    if (collection) {
      dispatch(addToCart({ product: collection, quantity: 1 }));
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!collection) return null;

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-3">
        <Card.Img variant="top" src={collection.image} style={{ maxHeight: 400, objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{collection.title}</Card.Title>
          <Card.Text>{collection.description}</Card.Text>
          <Card.Text><strong>Ingredients:</strong> {collection.ingredients}</Card.Text>
          <Card.Text className="text-success fw-bold">{collection.price}</Card.Text>
          <Button variant="dark" onClick={handleAddToCart}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CollectionPage;
