// src/components/SearchBar.tsx
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Product } from "../store/productsSlice";


const SearchBar: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get("http://localhost:4000/products?page=1&limit=1000").then((res) => {
            setAllProducts(res.data.products);
        });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts([]);
            setShowSuggestions(false);
        } else {
            const term = searchTerm.toLowerCase();
            const matches = allProducts.filter(
                (p) =>
                    p.title.toLowerCase().includes(term) ||
                    p.description?.toLowerCase().includes(term) ||
                    p.ingredients?.toLowerCase().includes(term)
            );
            setFilteredProducts(matches);
            setShowSuggestions(true);
        }
    }, [searchTerm, allProducts]);

    const handleSelect = (productId: number) => {
        setSearchTerm("");
        setShowSuggestions(false);
        navigate(`/products#product-${productId}`);
        if (location.pathname !== "/products") {
            setTimeout(() => {
                const element = document.getElementById(`product-${productId}`);
                if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <FormControl
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {showSuggestions && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 999,
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        maxHeight: 300,
                        overflowY: "auto",
                    }}
                >
                    {filteredProducts.length === 0 ? (
                        <div className="p-2 text-muted">No results found.</div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="d-flex align-items-center p-2 border-bottom"
                                role="button"
                                onClick={() => handleSelect(product.id)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{ width: 40, height: 40, objectFit: "cover", marginRight: 10 }}
                                />
                                <div>
                                    <div className="fw-bold">{product.title}</div>
                                    <small className="text-muted">{product.description}</small>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
