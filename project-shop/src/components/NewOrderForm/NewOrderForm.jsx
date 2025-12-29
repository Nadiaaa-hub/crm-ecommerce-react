import { useDispatch } from "react-redux";
import { createOrderAsync } from "../../features/OrdersReducer.js";
import { useNavigate } from "react-router-dom";
import "../../styles/NewOrderForm.css";
import { useField, useFormik } from "formik";
import { OrderSchema } from "../../features/shema/OrdersShema.js";
import { useSelector } from "react-redux";
import { clearClient } from "../../features/CurrentClientReducer.js";

export default function NewOrderForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentClient = useSelector((state) => state.currentClient.client);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: currentClient?.name || "",
      phone: currentClient?.phone || "",
      postOffice: "",
      city: "",
      comment: "",
      email: currentClient?.email || "",
      titleOrder: "",
      price: "",
      quantity: 1,
    },
    validationSchema: OrderSchema,
    onSubmit: (values, { resetForm }) => {
      const payload = {
        client: {
          name: values.fullname,
          phone: values.phone,
          city: values.city,
          postOffice: values.postOffice,
          email: values.email,
        },

        items: [
          {
            title: values.titleOrder,
            price: values.price,
            quantity: values.quantity,
            comment: values.comment,
            total: Number(values.price) * Number(values.quantity),
          },
        ],
      };

      dispatch(createOrderAsync(payload));
      dispatch(clearClient());
      resetForm();
    },
  });

  const total = Number(formik.values.price) * Number(formik.values.quantity);

  const handleClickMore = () => {
    if (formik.values.quantity < 10) {
      formik.setFieldValue("quantity", Number(formik.values.quantity) + 1);
    }
  };

  const handleClickLess = () => {
    if (formik.values.quantity > 1) {
      formik.setFieldValue("quantity", Number(formik.values.quantity) - 1);
    }
  };

  const handleCloseForm = () => {
    navigate("/orders");
  };

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <h1 className="form-title">Create New Order</h1>
        <div className="client-box">
          <span>Client</span>
          <div className="input-box">
            Fullname:
            <input
              type="text"
              name="fullname"
              placeholder="Іваненко Іван Іванович"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="error">{formik.errors.fullname}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-box">
            Phone:
            <input
              type="text"
              name="phone"
              placeholder="+380*********"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-box">
            City:
            <input
              type="text"
              name="city"
              placeholder="Київ"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="error">{formik.errors.city}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-box">
            Post office:
            <input
              type="text"
              name="postOffice"
              placeholder="Нова пошта №122"
              value={formik.values.postOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.postOffice && formik.errors.postOffice ? (
              <div className="error">{formik.errors.postOffice}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-box">
            Email:
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="item-box">
          <span>Item</span>
          <div className="input-box">
            Title:
            <input
              type="text"
              name="titleOrder"
              placeholder=" Шарф вовняний в смужку (150х20см)"
              onChange={formik.handleChange}
              value={formik.values.titleOrder}
              onBlur={formik.handleBlur}
            />
            {formik.touched.titleOrder && formik.errors.titleOrder ? (
              <div className="error">{formik.errors.titleOrder}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-box">
            Price:
            <input
              type="number"
              name="price"
              placeholder="1000 ₴"
              onChange={formik.handleChange}
              value={formik.values.price}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : (
              ""
            )}
          </div>
          <div className="quantity-box">
            <button type="button" onClick={handleClickLess}>
              -
            </button>

            <input
              min={1}
              max={10}
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <button type="button" onClick={handleClickMore}>
              +
            </button>
            {formik.touched.quantity && formik.errors.quantity && (
              <div>{formik.errors.quantity}</div>
            )}
          </div>
          <div>
            <textarea
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Коментар до замовлення.."
            />

            {formik.touched.comment && formik.errors.comment ? (
              <div className="error">{formik.errors.comment}</div>
            ) : (
              ""
            )}
          </div>
          <div>
            <h2>Total: {total}</h2>
          </div>
        </div>

        <div className="button-box">
          <button className="btn-save" type="submit">
            Save
          </button>
          <button className="btn-close" type="button" onClick={handleCloseForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
