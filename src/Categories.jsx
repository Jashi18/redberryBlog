import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        const response = await axios.get(
          "https://api.blog.redberryinternship.ge/api/categories"
        );
        setCategories(response.data.data); // Adjust based on the response structure
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error && <p>{error}</p>}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "30px",
          width: "1100px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {categories.map((category) => (
          <li
            style={{
              backgroundColor: category.background_color,
              color: category.text_color,
              padding: "8px 16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              opacity: "0.8",
            }}
            key={category.id}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
