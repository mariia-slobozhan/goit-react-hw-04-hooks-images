import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({ images, handleOpenPicture }) {
  return (
    <>
      {images.map((image) => (
        <li key={image.id} className={s.imageGalleryItem}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={s.imageGalleryItemImage}
            onClick={() => handleOpenPicture(image)}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  handleOpenPicture: PropTypes.func,
};
