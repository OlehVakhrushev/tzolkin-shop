import React, { useState } from "react";
import {
    Navbar,
    Container,
    Nav,
    Button,
    Form,
    FormControl,
} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";
import CartModal from "../components/CartModal";
import SearchBar from "../components/SearchBar";




const NavigationBar: React.FC = () => {

    const [showCart, setShowCart] = useState(false);

    const cartItemCount = useSelector(selectCartCount); // импортируем селектор

    const handleCartClick = () => {
        setShowCart(true);
    };

    return (
        <Navbar expand="lg" className="navbar-mayan py-3">
            <CartModal show={showCart} onClose={() => setShowCart(false)} />

            <Container>
                <Navbar.Brand href="#">
                    <img
                        src="/images/logo_svg.png"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Tzolk’in Chocolate"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                    </Nav>

                    <div className="me-3" style={{ minWidth: 250, position: "relative" }}>
                        <SearchBar />
                    </div>

                    <Nav>
                        <Nav.Link onClick={handleCartClick} className="me-3 position-relative">
                            <i className="bi bi-cart" style={{ fontSize: "1.4rem" }}></i>
                            {cartItemCount > 0 && (
                                <span className="position-absolute top-10 start-50 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                                    {cartItemCount}
                                </span>
                            )}
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <i className="bi bi-person" style={{ fontSize: "1.2rem" }}></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <CartModal show={showCart} onClose={() => setShowCart(false)} />
        </Navbar>

    );
};

export default NavigationBar;
