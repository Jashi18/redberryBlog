// MultiSelectCategories.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MultiSelectCategories = ({ onCategoriesChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setError(null);
        const response = await axios.get(
          "https://api.blog.redberryinternship.ge/api/categories"
        );
        setCategories(response.data.data);
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      }
    };

    fetchCategories();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelection = (category) => {
    const isSelected = selectedCategories.some(
      (selected) => selected.id === category.id
    );
    if (!isSelected) {
      const updatedSelectedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedSelectedCategories);
      onCategoriesChange(updatedSelectedCategories);
    } else {
      const updatedSelectedCategories = selectedCategories.filter(
        (selected) => selected.id !== category.id
      );
      setSelectedCategories(updatedSelectedCategories);
      onCategoriesChange(updatedSelectedCategories);
    }
  };

  const removeCategory = (categoryToRemove) => {
    const updatedSelectedCategories = selectedCategories.filter(
      (category) => category.id !== categoryToRemove.id
    );
    setSelectedCategories(updatedSelectedCategories);
    onCategoriesChange(updatedSelectedCategories);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "300px" }}>
      {error && <p>{error}</p>}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          cursor: "text",
        }}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {selectedCategories.map((category) => (
          <div
            key={category.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              background: "#eee",
              borderRadius: "15px",
              marginRight: "5px",
            }}
          >
            {category.title}
            <span
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                removeCategory(category);
              }}
            >
              &times;
            </span>
          </div>
        ))}
        <input
          style={{ flex: 1, border: "none", outline: "none" }}
          placeholder="შეიყვანეთ"
        />
        <span style={{ cursor: "pointer" }}>{dropdownVisible ? "▲" : "▼"}</span>
      </div>

      {dropdownVisible && (
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
            zIndex: "1000",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {categories.map((category) => (
            <li
              key={category.id}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: selectedCategories.some(
                  (selected) => selected.id === category.id
                )
                  ? "#ddd"
                  : "#fff",
              }}
              onClick={() => handleCategorySelection(category)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MultiSelectCategories.propTypes = {
  onCategoriesChange: PropTypes.func.isRequired,
};

export default MultiSelectCategories;
