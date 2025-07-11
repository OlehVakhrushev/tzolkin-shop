// src/pages/ProductsPage.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner, Alert } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { RootState, AppDispatch } from "../store/store";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { items: products, loading, error, total } = useSelector(
    (state: RootState) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;
  const totalPages = Math.ceil(total / productsPerPage);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our Products</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Row>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default ProductsPage;
