import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Image, Button, ButtonGroup } from "react-bootstrap";
import { RootState } from "../store/store";
import { CartItem, removeFromCart, updateQuantity } from "../store/cartSlice";

interface Props {
  shippingMethod: string;
}

const getShippingCost = (method: string) => {
  switch (method) {
    case "standard":
      return 4.99;
    case "express":
      return 9.99;
    case "pickup":
      return 0;
    default:
      return 0;
  }
};

const OrderSummary: React.FC<Props> = ({ shippingMethod }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const parsePrice = (priceStr: string) =>
    parseFloat(priceStr.replace("$", "").trim());

  const subtotal = items.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0
  );

  const shippingCost = getShippingCost(shippingMethod);
  const total = subtotal + shippingCost;

  const handleQuantityChange = (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQty }));
    }
  };

  return (
    <Card className="p-4">
      <h4>Order Summary</h4>
      <ListGroup variant="flush" className="mb-3">
        {items.map((item: CartItem) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Image
                src={item.image}
                alt={item.title}
                style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }}
                rounded
              />
              <div>
                <div className="fw-bold">{item.title}</div>
                <div className="d-flex align-items-center mt-1">
                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(item, -1)}>-</Button>
                    <Button variant="light" disabled>{item.quantity}</Button>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(item, 1)}>+</Button>
                  </ButtonGroup>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <div className="fw-semibold">
              ${(parsePrice(item.price) * item.quantity).toFixed(2)}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Shipping</span>
        <span>${shippingCost.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-between fw-bold border-top pt-2">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </Card>
  );
};

export default OrderSummary;
