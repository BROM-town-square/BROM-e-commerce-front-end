# Taste Town

# **Online E-commerce supermarket**

This project is an online e-commerce suprmarket built with React. It allows users to explore a veriety of products and filter by category. An admin panel is included to add **new products** to the catalog and **delete existing products** from the server.Mainly focusing on working with useState,useEffect,Routing and fetching from external APIs.

---

## **Installation**

Access the live application here: [Live Link](https://brom-e-commerce-front-end.onrender.com/)

GitHub Repository: [Taste Town](https://github.com/BROM-town-square)

1. Clone this repository:
   ```bash
   git clone https://github.com/BROM-town-square
   ```
2. Navigate to the project directory:
   ```bash
   cd Taste-Town
   ```
3. Install all dependencies
   ```bash
   npm intsall
   ```
4. Ensure to all applicable components the server url is set to ``.

5. Run the project on browser
   ```bash
   npm run devdev
   ```

---

## **How the user interface works**

### **App.jsx**

This script fetches product data from the server and passing it down to components.It also houses all the routes that enable the user to effortlessly navigate around the the website and renders the components.

```jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import Errorlink from "./components/Errorlink";
import ProductDetail from "./subcomponents/ProductDetails";
import { useState, useEffect } from "react";
import Admin from "./components/Admin";

function App() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetch("https://taste-town-server.vercel.app/items")
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "About", element: <About /> },
        { path: "Contact", element: <Contact /> },
        { path: "Menu", element: <Menu products={products} /> },
        { path: "product/:id", element: <ProductDetail /> },
        {
          path: "Admin",
          element: <Admin products={products} setproducts={setproducts} />,
        },
      ],
    },
    {
      path: "*",
      element: <Errorlink />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
```

---

### **FilterEchange**

This is where the filter functionnality is housed, the filter button opens a side bar containg the avaialble categories and a checkbox that when checked filteres the products and passes the filtred array to the `productCard`.The user is also able to add items to a vrtual cart.

```jsx
import React, { useState } from "react";
import Productcard from "./Productcard";
import FilterOption from "./FilterOption";

const FilterExchange = ({ products }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCart, setshowCart] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartItems, setcartItems] = useState([]);

  const addToCart = (product) => {
    setcartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setcartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setcartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const toggleCart = () => {
    setshowCart((prev) => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((product) =>
          selectedCategories.includes(product.category)
        );

  return (
    <div className="filter-exchange">
      <FilterOption
        toggleSidebar={toggleSidebar}
        toggleCart={toggleCart}
        cartItemCount={cartItems.length}
      />

      <div className={`sidecart ${showCart ? "showcart" : "hidecart"}`}>
        <h3>Your Cart ({cartItems.length})</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>
                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h4>Total: ${cartTotal.toFixed(2)}</h4>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
        <button className="sidebtn" onClick={toggleCart}>
          Close
        </button>
      </div>

      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
        <h3>Filter by Category</h3>
        {categories.map((category, id) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
        <button className="sidebtn" onClick={toggleSidebar}>
          Close
        </button>
      </div>

      <Productcard products={filteredProducts} addToCart={addToCart} />
    </div>
  );
};

export default FilterExchange;
```

---

### **ProductCard**

This is where each of the product are displayed in thier individual div and displayed in the menu.An onClick event listener is placed on each image, when clicked passes the clicked propduct data to navigate and is stored in state and then navigated to the `ProductDetails`

```jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const IndividualProduct = ({ image, name, price, product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="individualprod">
      <img src={image} alt="Product Image" onClick={handleClick} />
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <button>Add to cart</button>
    </div>
  );
};

const Productcard = ({ products }) => {
  console.log(products);

  return (
    <div className="productdiv">
      {products.map((product, id) => (
        <IndividualProduct
          key={id}
          image={product.image}
          name={product.name}
          price={product.price}
          product={product}
        />
      ))}
    </div>
  );
};

export default Productcard;
```

---

### **ProductDetails**

This part is where a clicked product infomation that is hidden in the menu is shown.The passed data about the product is accessed using useLocation and that data used to load more infomation on the product and if user accidentally accesses this page a "product not found" message will be displayed with a button to navigate back to menu.

```jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/Menu");
  };

  if (!product) {
    return (
      <>
        <p>Product not found.</p>
      </>
    );
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>{product.description || "No description available."}</p>
      <button className="back-to-list-btn" onClick={handleBackToList}>
        Back to Product List
      </button>
    </div>
  );
};

export default ProductDetail;
```

---

## **How the Admin interface works**

The admin page can be accessed by clicking on the `usergear` icon.

### **DeleteProducts.jsx**

This part the is a table that displays all the server products with a a delete button for each product.When delete button is clicked an asyncronized function is used to delete products from the server and update the UI only when the server deletion is successful to make sure the UI and server are always in sync.

```jsx
import React from "react";

const DeleteProducts = ({ products, setproducts }) => {
  async function handleDelete(id) {
    try {
      const res = await fetch(
        `https://taste-town-server.vercel.app/items/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete from server");
      }

      const filtered = products.filter(
        (product) => String(product.id) !== String(id)
      );
      setproducts(filtered);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  return (
    <div className="admin-panel">
      <h2 className="admin-title">DELETE </h2>
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeleteProducts;
```

---

### **AddProducts.jsx**

This part uses a form to collect data and uses a fetch request to add products to the server which update the UI also fetching from them.

```jsx
import React, { useState } from "react";

const AddProducts = ({ products }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productCategory: "",
    productDescription: "",
    productImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.productPrice <= 0) {
      alert("Product price must be a positive number.");
      return;
    }

    const lastId =
      products.length > 0 ? parseInt(products[products.length - 1].id) : 0;
    const newId = (lastId + 1).toString();

    const productData = {
      id: newId,
      name: formData.productName,
      price: parseFloat(formData.productPrice),
      category: formData.productCategory,
      description: formData.productDescription,
      image: formData.productImage,
    };

    fetch("https://taste-town-server.vercel.app/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product added:", data);
        alert("Product added successfully!");
      })
      .catch((error) => console.error("Error:", error));

    setFormData({
      productName: "",
      productPrice: "",
      productCategory: "",
      productDescription: "",
      productImage: "",
    });
  };

  return (
    <div className="add-product-container">
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />

        <label htmlFor="productCategory">Product Category:</label>
        <input
          type="text"
          id="productCategory"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          required
        />

        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="productImage">Product Image URL:</label>
        <input
          type="url"
          id="productImage"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
```

---

## **Feature Overview**

- Product detail page with routing.
- Dynamic filtering products by category.
- Adding products on a virtual cart.
- Admin panel for **adding new product** and **deleting existing products** from server.

---

## **Technologies Used**

### **Frontend**

- **React** – Frontend library for building UI components
- **React Router DOM** – Client-side routing
- **React Hooks** (`useState`, `useEffect`) – For managing state and side effects
- **CSS** – Custom styling

### **Backend (API)**

- **Node.js (hosted on Render)** – RESTful API for product data
- **API Endpoint** – [`https://taste-town-five.vercel.app/items`](https://taste-town-five.vercel.app/items)

---

## **Authors**

**Front End**

- Brian Njuguna - [https://github.com/NJUGUNA-png]
- Joy Mitchel - [https://github.com/JoyMitchel]

**Back End**

- Ricahrd Wasonga - [https://github.com/Richard3wasonga]
- Nevil Oporo - [https://github.com/Neviloporo]

---

## **License**

This project is open-source and available under the MIT License.
