import "../styles/modal.css";
import { FaRegTimesCircle } from "react-icons/fa";
const Modal = ({ children, close, height, width }) => {
  return (
    <div className="modal-container" onClick={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-body"
        style={{
          height: height ? height : "auto",
          width: width ? width : "600px",
          left: `calc(50% - ${width ? width : "600px"} / 2 + 2px)`,
        }}
      >
        <div className="close-icon">
          <FaRegTimesCircle onClick={close} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
