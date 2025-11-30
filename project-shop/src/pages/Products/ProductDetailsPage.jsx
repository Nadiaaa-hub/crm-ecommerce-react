import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products.js";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div style={{ padding: "24px" }}>
        <p>Товар не знайдено</p>
        <Link to="/products">Повернутися до каталогу</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Link to="/products">Назад до каталогу</Link>

      <h1>{product.name}</h1>
      <p>{product.price} грн</p>
      <p>{product.description}</p>
    </div>
  );
}

