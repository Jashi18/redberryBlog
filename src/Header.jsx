import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Logo from "./assets/Logo.svg";
import Image from "./assets/Image.svg";
import Mark from "./assets/Mark.svg";
import { Link } from "react-router-dom";

// Set the base URL for Axios
const API_BASE_URL = "https://api.blog.redberryinternship.ge/api";

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleAddBlogClick = () => {
    history.push("/addBlog"); // Navigate to AddBlog when the button is clicked
  };

  // Set the app element for accessibility reasons
  Modal.setAppElement("#root");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const retrieveToken = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/token`);
      const retrievedToken = response.data.token; // Adjust according to response structure
      localStorage.setItem("token", retrievedToken); // Store token
      setToken(retrievedToken); // Update state
      return retrievedToken;
    } catch (error) {
      console.error("Error retrieving token:", error);
      throw error;
    }
  };

  const checkEmailInDatabase = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.status === 204) {
        console.log("User logged in successfully");
        setLoginSuccess(true); // Indicate that the login was successful
      } else {
        setEmailError("Email not found or error occurred");
        setLoginSuccess(false); // Reset the success flag
      }
    } catch (error) {
      setEmailError("Error checking email in database");
      setLoginSuccess(false); // Reset the success flag
    }
  };

  const validateEmail = () => {
    if (email.endsWith("@redberry.ge")) {
      if (!token) {
        retrieveToken().then(checkEmailInDatabase).catch(console.error);
      } else {
        checkEmailInDatabase();
      }
    } else {
      setEmailError("Only @redberry.ge emails can log in.");
      setLoginSuccess(false); // Reset the success flag
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <img src={Logo} alt="Redberry Logo" style={{ marginLeft: "60px" }} />
        {loginSuccess && !modalIsOpen ? (
          <Link
            to={"/addBlog"}
            onClick={handleAddBlogClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#5D37F3",
              border: "none",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "60px",
            }}
          >
            ბლოგის დამატება
          </Link>
        ) : (
          <button
            onClick={openModal}
            style={{
              padding: "10px 20px",
              backgroundColor: "#5D37F3",
              border: "none",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "60px",
            }}
          >
            შესვლა
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "64px", marginLeft: "60px" }}>ბლოგი</h1>
        <img src={Image} alt="Decorative" />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            width: "480px",
            height: "272px",
            margin: "auto",
          },
        }}
      >
        {loginSuccess ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img style={{ marginTop: "30px" }} src={Mark} />
            <p
              style={{
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              წარმატებული ავტორიზაცია
            </p>
            <button
              onClick={closeModal}
              style={{
                height: "40px",
                backgroundColor: "#5D37F3",
                border: "none",
                color: "white",
                borderRadius: "8px",
                marginTop: "60px",
                cursor: "pointer",
                width: "432px",
              }}
            >
              კარგი
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ alignSelf: "center" }}>შესვლა</h2>
            <h4 style={{ marginTop: "40px" }}>ელ-ფოსტა</h4>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example @redberry.ge"
              style={{
                height: "44px",
                borderRadius: "12px",
                border: "1.5px solid #5D37F3",
                marginTop: "15px",
              }}
            />
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            <button
              onClick={validateEmail}
              style={{
                height: "40px",
                backgroundColor: "#5D37F3",
                border: "none",
                color: "white",
                borderRadius: "8px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              შესვლა
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Header;
