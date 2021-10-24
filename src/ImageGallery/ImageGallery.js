import { Component } from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={s.imageGallery}>
          <ImageGalleryItem
            images={this.props.images}
            handleOpenPicture={this.props.handleOpenPicture}
          />
        </ul>
        <Button onClick={this.props.onBtnClick} />
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  handleOpenPicture: PropTypes.func,
  onBtnClick: PropTypes.func,
};
