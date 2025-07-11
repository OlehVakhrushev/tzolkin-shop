// src/components/PaymentMethod.tsx
import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';

const PaymentMethod: React.FC = () => {
  const [paymentType, setPaymentType] = useState("card");

  return (
    <div>
      <h4 className="mb-3">Payment Method</h4>
      <Form>
        <Form.Check
          type="radio"
          label="Credit/Debit Card"
          name="paymentMethod"
          id="card"
          value="card"
          checked={paymentType === "card"}
          onChange={() => setPaymentType("card")}
        />

        {paymentType === "card" && (
          <div className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="1234 5678 9012 3456" required />
            </Form.Group>

            <Row>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" required />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="123" required />
              </Form.Group>
            </Row>
          </div>
        )}
      </Form>
    </div>
  );
};

export default PaymentMethod;
