import React from "react";
import { Modal, Button, Table, Image, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Link } from "react-router-dom";


interface CartModalProps {
  show: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty >= 1 && newQty <= 15) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    } else if (newQty < 1) {
      dispatch(removeFromCart(id));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <Table bordered hover responsive className="text-center align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <Image src={item.image} width={50} height={50} rounded />
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        –
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      ${(
                        parseFloat(item.price.replace("$", "")) * item.quantity
                      ).toFixed(2)}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="mt-4">
              <h5>Cart Totals</h5>
              <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <Form.Group className="mb-3">
                <Form.Label>Shipping</Form.Label>
                <Form.Control type="text" placeholder="Enter your address to view shipping options" />
              </Form.Group>
              <p><strong>Total:</strong> ${subtotal.toFixed(2)}</p>
              <Link to="/checkout" className="btn btn-success btn-homm w-100 mt-3">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
