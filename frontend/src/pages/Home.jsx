import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  Star,
  Menu,
} from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          ShopKart
        </h1>

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "10px 15px",
            borderRadius: "10px",
            width: "40%",
          }}
        >
          <Search color="black" size={18} />

          <input
            type="text"
            placeholder="Search products..."
            style={{
              border: "none",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
            }}
          />
        </div>

        {/* Icons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Heart cursor="pointer" />
          <ShoppingCart cursor="pointer" />
          <User cursor="pointer" />
          <Menu cursor="pointer" />
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          height: "400px",
          background:
            "linear-gradient(to right, #111827, #2563eb)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "55px",
              marginBottom: "20px",
            }}
          >
            Discover Latest Products
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
            }}
          >
            Best deals on electronics, fashion and more.
          </p>

          <button
            style={{
              padding: "15px 30px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#facc15",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Shop Now
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="hero"
          style={{
            width: "450px",
            borderRadius: "20px",
          }}
        />
      </section>

      {/* Categories */}
      <section
        style={{
          padding: "40px 60px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "32px",
          }}
        >
          Categories
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {[
            "Mobiles",
            "Laptops",
            "Gaming",
            "Fashion",
            "Audio",
            "Accessories",
          ].map((category, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "20px 30px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section
        style={{
          padding: "20px 60px 60px",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "32px",
          }}
        >
          Featured Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "15px",
                }}
              >
                <h3>{product.name}</h3>

                <p
                  style={{
                    color: "gray",
                    margin: "10px 0",
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <Star fill="gold" color="gold" size={18} />
                  <Star fill="gold" color="gold" size={18} />
                  <Star fill="gold" color="gold" size={18} />
                  <Star fill="gold" color="gold" size={18} />
                  <Star fill="gold" color="gold" size={18} />
                </div>

                <h2
                  style={{
                    color: "#2563eb",
                  }}
                >
                  ₹ {product.price}
                </h2>

                <button
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "#111827",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          backgroundColor: "white",
          padding: "50px 60px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {[
          "Free Shipping",
          "Secure Payment",
          "24/7 Support",
          "Easy Returns",
        ].map((item, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              minWidth: "200px",
              textAlign: "center",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#f3f4f6",
            }}
          >
            <h3>{item}</h3>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: "40px 60px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div>
            <h2>ShopKart</h2>
            <p>Your one stop ecommerce platform.</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <p>Home</p>
            <p>Products</p>
            <p>Contact</p>
          </div>

          <div>
            <h3>Support</h3>
            <p>Help Center</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

        <hr
          style={{
            margin: "30px 0",
            borderColor: "#374151",
          }}
        />

        <p
          style={{
            textAlign: "center",
          }}
        >
          © 2026 ShopKart. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;