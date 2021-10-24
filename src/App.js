import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import ContentLoader from "./Loader/Loader";
import "./App.css";
import pictureSearchAPI from "./services/pictureSearchAPI";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({});

  useEffect(() => {
    if (query === "") {
      return;
    }
    setStatus("pending");
    pictureSearchAPI(query, page)
      .then((images) => {
        if (images.data.totalHits === 0) {
          setStatus("rejected");
        }
        setImages((prevState) => [...prevState, ...images.data.hits]);
        setStatus("resolved");
        setPage((prevState) => prevState);
      })
      .catch(() => setStatus("rejected"));
  }, [page, query]);

  useEffect(() => {
    if (page !== 1) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [page]);

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleOpenPicture = (image) => {
    setImage(image);
    setShowModal(true);
  };

  const onBtnClick = () => {
    setPage((prevState) => prevState + 1);
    setStatus("pending");
  };

  return (
    <div>
      <ToastContainer autoClose={3500} />
      <Searchbar handleFormSubmit={handleFormSubmit} />
      {status === "idle" && <div className="error">Type some request word</div>}
      {status === "rejected" && (
        <div className="error">Can not find images for your request</div>
      )}
      {status === "pending" && <ContentLoader />}
      {status === "resolved" && (
        <ImageGallery
          images={images}
          onBtnClick={onBtnClick}
          handleOpenPicture={handleOpenPicture}
        />
      )}
      {showModal && <Modal onClose={toggleModal} image={image} />}
    </div>
  );
}
