// src/pages/Products/ProductsPage.jsx

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products.js";
import '../../styles/ProductsPage.css'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    []
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const byCategory =
          selectedCategory === "all" || product.category === selectedCategory;

        const bySearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return byCategory && bySearch;
      }),
    [selectedCategory, searchQuery]
  );

  return (
    <div className="products-page">
      <h1 className="products-page__title">Каталог товарів</h1>

      <div className="products-filters">
        <div className="products-filters__item">
          <label className="products-filters__label">
            Категорія
            <select
              className="products-filters__select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Усі категорії</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="products-filters__item">
          <label className="products-filters__label">
            Пошук
            <input
              className="products-filters__input"
              type="text"
              placeholder="Введіть назву товару"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Список товарів */}
      {filteredProducts.length === 0 ? (
        <p className="products-empty">За заданими фільтрами нічого не знайдено 😢</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card"
            >
              <div className="product-card__image-wrapper">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-card__image"
                  />
                ) : (
                  <span className="product-card__image-placeholder">
                    {product.category}
                  </span>
                )}
              </div>

              <div className="product-card__info">
                <div className="product-card__category">
                  {product.category}
                  {product.subcategory && ` · ${product.subcategory}`}
                </div>

                <h2 className="product-card__name">{product.name}</h2>

                <div className="product-card__bottom">
                  <div className="product-card__price">
                    {product.price}{" "}
                    <span className="product-card__currency">грн</span>
                  </div>

                  {product.stock !== undefined && (
                    <div className="product-card__stock">
                      В наявності: {product.stock} шт.
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
