// src/components/CollectionsList.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface Collection {
    id: number;
    title: string;
    description: string;
    image: string;
    price?: string;
    ingredients?: string;
}

const CollectionsList: React.FC = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:4000/collections");
                setCollections(res.data);
            } catch (err) {
                setError("Failed to load collections");
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    const handleAddToCart = (collection: Collection) => {
        dispatch(addToCart({
            product: {
                id: collection.id,
                title: collection.title,
                description: collection.description,
                price: collection.price || "$0.00",
                image: collection.image,
                ingredients: collection.ingredients,
            },
            quantity: 1,
        }));
    };

    return (
        <Container className="my-5" id="collections">
            <h2 className="text-center mb-4">Our Collections</h2>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}

            <Row>
                {collections.map((collection) => (
                    <Col
                        md={4}
                        key={collection.id}
                        className="mb-4"
                        style={{ cursor: "pointer" }}
                    >
                        <Card className="h-100 shadow-sm homm-card d-flex flex-column justify-content-between">
                            <div onClick={() => navigate(`/collection/${collection.id}`)}>
                                <Card.Img
                                    variant="top"
                                    src={collection.image}
                                    style={{ height: 200, objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>
                                        {collection.title} {collection.price && <span className="text-success">– {collection.price}</span>}
                                    </Card.Title>
                                    <Card.Text style={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                                        {collection.description}
                                    </Card.Text>
                                </Card.Body>
                            </div>
                            <div className="text-center pb-3">
                                <Button className="btn-homm press-effect" size="sm" onClick={() => handleAddToCart(collection)}>
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CollectionsList;
