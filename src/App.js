import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import ContentLoader from "./Loader/Loader";
import "./App.css";
import pictureSearchAPI from "./services/pictureSearchAPI";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";

class App extends Component {
  state = {
    query: "",
    images: [],
    error: null,
    status: "idle",
    page: 1,
    showModal: false,
    image: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: "pending" });

      pictureSearchAPI(query, page)
        .then((images) => {
          console.log(images);
          if (images.data.totalHits === 0) {
            this.setState({
              status: "rejected",
            });
          }
          this.setState((prevState) => ({
            images: [...prevState.images, ...images.data.hits],
            status: "resolved",
            page: prevState.page,
          }));
          if (this.state.images.length > 12) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleFormSubmit = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  handleOpenPicture = (image) => {
    this.setState({ image, showModal: true });
  };

  onBtnClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <div>
        <ToastContainer autoClose={3500} />
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        {status === "idle" && (
          <div className="error">Type some request word</div>
        )}
        {status === "rejected" && (
          <div className="error">Can not find images for your request</div>
        )}
        {status === "pending" && <ContentLoader />}
        {status === "resolved" && (
          <ImageGallery
            images={images}
            onBtnClick={this.onBtnClick}
            handleOpenPicture={this.handleOpenPicture}
          />
        )}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} image={this.state.image} />
        )}
      </div>
    );
  }
}

export default App;
