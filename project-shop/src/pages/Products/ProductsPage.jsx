import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext.jsx";
import AddProductModal from "../../components/AddProductModal.jsx";
import "../../styles/ProductsPage.css";

export default function ProductsPage() {
  const { productList, setProductList } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const handleAddProduct = (data) => {
    if (!data.name.trim() || !data.price) {
      alert("Заповніть назву та ціну");
      return;
    }
  
    const priceNumber = Number(data.price);
    if (Number.isNaN(priceNumber)) {
      alert("Ціна має бути числом");
      return;
    }
  
    const newId =
      productList.length > 0
        ? Math.max(...productList.map((p) => p.id)) + 1
        : 1;
  
    const createdProduct = {
      id: newId,
      category: data.category || "Аксесуари",
      subcategory: data.subcategory || "",
      name: data.name,
      price: priceNumber,
      currency: "UAH",
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      stock: Number(data.stock) || 1,
    };
  
    setProductList((prev) => [...prev, createdProduct]);
    setIsAddOpen(false);
  };
  

  const categories = useMemo(
    () => Array.from(new Set(productList.map((p) => p.category))),
    [productList]
  );

  const filteredProducts = useMemo(
    () =>
      productList.filter((product) => {
        const byCategory =
          selectedCategory === "all" || product.category === selectedCategory;

        const bySearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return byCategory && bySearch;
      }),
    [productList, selectedCategory, searchQuery]
  );

  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">Каталог товарів</h1>
        <button
          className="products-add-btn"
          onClick={() => setIsAddOpen(true)}
        >
          + Додати товар
        </button>
      </div>

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

      {filteredProducts.length === 0 ? (
        <p className="products-empty">
          За заданими фільтрами нічого не знайдено 😢
        </p>
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
      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}