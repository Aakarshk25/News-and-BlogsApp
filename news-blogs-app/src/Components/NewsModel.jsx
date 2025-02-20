import demoImg from "../assets/images/demo.jpg";
import './NewsModel.css'
export const NewsModel = () => {
  return (
    <div className="model-overlay">
      <div className="model-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark"> </i>
        </span>
        <img src={demoImg} alt="Model Image" />
        <h2 className="modal-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          accusamus.
        </h2>
        <p className="modal-source">Source the guradian</p>
        <p className="modal-date">Feb 24, 2025, 04:15</p>
        <p className="modal-content-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          magnam laudantium blanditiis beatae quisquam eveniet.
        </p>
        <a href="#" className="read-more-link">Read more...</a>
      </div>
    </div>
  );
};

export default NewsModel;
