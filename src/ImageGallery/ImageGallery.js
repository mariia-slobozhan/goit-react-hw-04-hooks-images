import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import s from "./ImageGallery.module.css";

export default function ImageGallery({
  images,
  handleOpenPicture,
  onBtnClick,
}) {
  return (
    <>
      <ul className={s.imageGallery}>
        <ImageGalleryItem
          images={images}
          handleOpenPicture={handleOpenPicture}
        />
      </ul>
      <Button onClick={onBtnClick} />
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  handleOpenPicture: PropTypes.func,
  onBtnClick: PropTypes.func,
};
