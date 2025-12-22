import React, { useState } from "react";

const initialForm = {
  category: "",
  subcategory: "",
  name: "",
  price: "",
  currency: "UAH",
  description: "",
  imageUrl: "",
  stock: 1,
};

export default function AddProductModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  if (!isOpen) return null; 

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);        // отдаем данные наверх в ProductsPage
    setForm(initialForm);  // очищаем форму
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Додати товар</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__field">
            <label>Категорія</label>
            <input
              type="text"
              placeholder='Напр. "Взуття"'
              value={form.category}
              onChange={handleFieldChange("category")}
            />
          </div>

          <div className="modal__field">
            <label>Підкатегорія</label>
            <input
              type="text"
              placeholder='Напр. "Черевики"'
              value={form.subcategory}
              onChange={handleFieldChange("subcategory")}
            />
          </div>

          <div className="modal__field">
            <label>Назва</label>
            <input
              type="text"
              placeholder='Напр. "Жіночі зимові черевики Oslo"'
              value={form.name}
              onChange={handleFieldChange("name")}
              required
            />
          </div>

          <div className="modal__row">
            <div className="modal__field">
              <label>Ціна (грн)</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={handleFieldChange("price")}
                required
              />
            </div>

            <div className="modal__field">
              <label>В наявності, шт</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={handleFieldChange("stock")}
              />
            </div>
          </div>

          <div className="modal__field">
            <label>Опис</label>
            <textarea
              rows="3"
              placeholder="Короткий опис товару"
              value={form.description}
              onChange={handleFieldChange("description")}
            />
          </div>

          <div className="modal__field">
            <label>Фото</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Прев'ю"
                className="modal__image-preview"
              />
            )}
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="modal__btn modal__btn--secondary"
              onClick={handleClose}
            >
              Скасувати
            </button>
            <button type="submit" className="modal__btn modal__btn--primary">
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}