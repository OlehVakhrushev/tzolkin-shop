// File: src/pages/CheckoutPage.tsx

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShippingForm from "../components/ShippingForm";
import OrderSummary from "../components/OrderSummary";
import PaymentMethod from "../components/PaymentMethod";

const CheckoutPage: React.FC = () => {
    const [shippingMethod, setShippingMethod] = useState("standard");



interface ShippingFormProps {
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
}

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4 homm-heading">Checkout</h2>
            <Row>
                <Col md={7}>
                    <div className="mb-4 homm-box">
                        <ShippingForm setShippingMethod={setShippingMethod} />
                    </div>
                    <div className="mb-4 homm-box">
                        <PaymentMethod />
                    </div>
                </Col>
                <Col md={5}>
                    <OrderSummary shippingMethod={shippingMethod} />
                    <div className="text-center mt-4">
                        <button className="homm-button w-100">Submit Order</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;