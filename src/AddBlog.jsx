import { useState, useRef } from "react";
import ImgInput from "./assets/ImgInput.svg";
import PropTypes from "prop-types";
import ImageIcon from "./assets/imageIcon.svg";
import MultiSelectCategories from "./MultiSelectCategories";

const ValidationMessage = ({ isValid, message }) => (
  <div
    style={{
      color: isValid ? "green" : "#85858D",
      fontSize: "12px",
      marginLeft: "5px",
    }}
  >
    {message}
  </div>
);

ValidationMessage.propTypes = {
  isValid: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

const AddBlog = () => {
  const [author, setAuthor] = useState(localStorage.getItem("author") || "");
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [blogText, setBlogText] = useState(
    localStorage.getItem("blogText") || ""
  );
  const [publishDate, setPublishDate] = useState(
    localStorage.getItem("publishDate") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [imageName, setImageName] = useState(
    localStorage.getItem("imageName") || ""
  );
  const [minLengthValid, setMinLengthValid] = useState(false);
  const [minWordsValid, setMinWordsValid] = useState(false);
  const [onlyGeorgianValid, setOnlyGeorgianValid] = useState(false);
  const [titleLengthValid, setTitleLengthValid] = useState(false);
  const [textLengthValid, setTextLengthValid] = useState(false);

  const [authorTouched, setAuthorTouched] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const [blogTextTouched, setBlogTextTouched] = useState(false);

  const fileInputRef = useRef(null);

  const validateAuthor = (authorValue) => {
    setMinLengthValid(authorValue.length >= 4);
    const words = authorValue.trim().split(" ").filter(Boolean);
    setMinWordsValid(words.length >= 2);
    const georgianAlphabetRegex = /^[ა-ჰ ]+$/;
    setOnlyGeorgianValid(georgianAlphabetRegex.test(authorValue));
  };

  const validateTitle = (titleValue) => {
    setTitleLengthValid(titleValue.length >= 4);
  };

  const validateTextarea = (textValue) => {
    setTextLengthValid(textValue.length >= 4);
  };

  const handleAuthorChange = (e) => {
    const newAuthor = e.target.value;
    setAuthor(newAuthor);
    localStorage.setItem("author", newAuthor);
    newAuthor.length >= 1 && setAuthorTouched(true);
    validateAuthor(newAuthor);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("title", newTitle);
    setTitleTouched(true);
    validateTitle(newTitle);
  };

  const handleTextareaChange = (e) => {
    const newText = e.target.value;
    setBlogText(newText);
    localStorage.setItem("text", newText);
    setBlogTextTouched(true);
    validateTextarea(newText);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      localStorage.setItem("imageName", file.name);
    }
  };

  const handleImageRemove = () => {
    setImageName("");
    localStorage.removeItem("imageName");
    fileInputRef.current.value = "";
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !minLengthValid ||
      !minWordsValid ||
      !onlyGeorgianValid ||
      !titleLengthValid
    ) {
      alert("Please correct the errors before submitting!");
      return;
    }
    // Construct form data and handle submission
    localStorage.clear();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1 style={{ alignSelf: "flex-start", marginBottom: "50px" }}>
          ბლოგის დამატება
        </h1>
        <p style={{ fontWeight: "bold" }}>ატვირთეთ ფოტო</p>
        <div
          onClick={handleImageClick}
          style={{
            width: "600px",
            height: imageName ? "56px" : "200px",
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            margin: "20px auto",
            borderRadius: "12px",
            background: "#F2F2FA",
            position: "relative",
          }}
        >
          <img
            src={ImgInput}
            alt="Upload Icon"
            style={{
              width: "50px",
              height: "50px",
              display: imageName ? "none" : "block",
            }}
          />
          <p style={{}}>{!imageName && "ჩააგდეთ ფაილი აქ ან აირჩიეთ ფაილი"}</p>
          <p
            style={{
              alignSelf: "flex-start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "20px",
              gap: "7px",
            }}
          >
            {imageName && <img src={ImageIcon} />} {imageName}
          </p>
          {imageName && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleImageRemove();
              }}
            >
              x
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label>ავტორი *:</label>
            <input
              style={{
                display: "block",
                height: "44px",
                width: "288px",
                borderRadius: "12px",
                marginTop: "5px",
                padding: "5px",
                border: `1px solid ${
                  authorTouched && author.length >= 1
                    ? minLengthValid && minWordsValid && onlyGeorgianValid
                      ? "green"
                      : "red"
                    : "#E4E3EB"
                }`,
              }}
              type="text"
              value={author}
              onChange={handleAuthorChange}
            />
            <ValidationMessage
              isValid={minLengthValid}
              message="მინიმუმ 4 სიმბოლო."
            />
            <ValidationMessage
              isValid={minWordsValid}
              message="მინიმუმ 2 სიტყვა."
            />
            <ValidationMessage
              isValid={onlyGeorgianValid}
              message="მხოლოდ ქართული ასოები."
            />
          </div>
          <div>
            <label>სათაური *:</label>
            <input
              style={{
                display: "block",
                height: "44px",
                width: "288px",
                borderRadius: "12px",
                border: `1px solid ${
                  titleTouched && title.length >= 1
                    ? titleLengthValid
                      ? "green"
                      : "red"
                    : "#E4E3EB"
                }`,
                marginTop: "5px",
                padding: "5px",
              }}
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            <ValidationMessage
              isValid={titleLengthValid}
              message="სათაური უნდა იყოს მინიმუმ 4 სიმბოლო."
            />
          </div>
        </div>
        <label>აღწერა:</label>
        <textarea
          style={{
            display: "block",
            width: "600px",
            height: "124px",
            border: `1px solid ${
              blogTextTouched && blogText.length >= 1
                ? textLengthValid
                  ? "green"
                  : "red"
                : "#E4E3EB"
            }`,
            marginTop: "5px",
            padding: "5px",
            borderRadius: "8px",
          }}
          value={blogText}
          onChange={handleTextareaChange}
        />
        <ValidationMessage
          isValid={textLengthValid}
          message="სათაური უნდა იყოს მინიმუმ 4 სიმბოლო."
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label>გამოქვეყნების თარიღი:</label>
            <input
              style={{
                display: "block",
                height: "44px",
                width: "288px",
                borderRadius: "12px",
                border: "1px solid #FAF2F3",
                marginTop: "5px",
                padding: "5px",
              }}
              type="date"
              value={publishDate}
              onChange={(e) => {
                setPublishDate(e.target.value);
                localStorage.setItem("publishDate", e.target.value);
              }}
            />
          </div>
          <div>
            <label>კატეგორიები:</label>
            <MultiSelectCategories />
          </div>
        </div>
        <label>მეილი:</label>
        <input
          style={{
            display: "block",
            height: "44px",
            width: "288px",
            borderRadius: "12px",
            border: "1px solid #FAF2F3",
            marginTop: "5px",
            padding: "5px",
          }}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            localStorage.setItem("email", e.target.value);
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#5D37F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
