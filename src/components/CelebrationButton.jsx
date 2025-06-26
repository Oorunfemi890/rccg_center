import { Link } from 'react-router-dom';

const CelebrationButton = () => {
  return (
    <section>
      <div className="button-container">
        <Link to="/celebration-form">
          <button className="long-button">Click here to submit your picture</button>
        </Link>
      </div>
    </section>
  );
};

export default CelebrationButton;