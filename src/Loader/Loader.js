import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

export default function ContentLoader() {
  return (
    <div className={s.loader}>
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
}
