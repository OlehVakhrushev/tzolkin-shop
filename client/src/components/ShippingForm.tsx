import React from "react";

interface ShippingFormProps {
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ setShippingMethod }) => {
  return (
    <div>
      <h5 className="homm-heading mb-3">Shipping Method</h5>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="radio"
          name="shipping"
          id="standard"
          value="standard"
          defaultChecked
          onChange={() => setShippingMethod("standard")}
        />
        <label className="form-check-label" htmlFor="standard">
          Standard Delivery (4–6 days) — $4.99
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="radio"
          name="shipping"
          id="express"
          value="express"
          onChange={() => setShippingMethod("express")}
        />
        <label className="form-check-label" htmlFor="express">
          Express Delivery (1–2 days) — $9.99
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="radio"
          name="shipping"
          id="pickup"
          value="pickup"
          onChange={() => setShippingMethod("pickup")}
        />
        <label className="form-check-label" htmlFor="pickup">
          Store Pickup — Free
        </label>
      </div>
    </div>
  );
};

export default ShippingForm;
