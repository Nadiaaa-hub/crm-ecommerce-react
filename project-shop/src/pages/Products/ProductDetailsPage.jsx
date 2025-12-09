import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext.jsx";
import "../../styles/ProductDetailsPage.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { productList } = useProducts();

  const productId = Number(id);
  const product = productList.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="product-details">
        <Link to="/products" className="product-details__back">
          ← Повернутися до каталогу
        </Link>
        <p className="product-details__not-found">Товар не знайдено</p>
      </div>
    );
  }

  return (
    <div className="product-details">
      <Link to="/products" className="product-details__back">
        ← Повернутися до каталогу
      </Link>

      <div className="product-details__content">
        <div className="product-details__image-wrapper">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-details__image"
            />
          ) : (
            <div className="product-details__image-placeholder">
              {product.category}
            </div>
          )}
        </div>

        <div className="product-details__info">
          <div className="product-details__category">
            {product.category}
            {product.subcategory && ` · ${product.subcategory}`}
          </div>

          <h1 className="product-details__title">{product.name}</h1>

          <div className="product-details__price">
            {product.price} <span className="product-details__currency">грн</span>
          </div>

          {product.stock !== undefined && (
            <div className="product-details__stock">
              В наявності: {product.stock} шт.
            </div>
          )}

          {product.description && (
            <p className="product-details__description">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
