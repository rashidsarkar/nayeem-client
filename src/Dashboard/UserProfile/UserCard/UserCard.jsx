import "./UserCard.css";
function UserCard({ imageUrl, title, description }) {
  return (
    <div className="max-w-lg carrdd">
      <div className="imgbox">
        <img src={imageUrl} alt="Card" />
      </div>
      <div className="content">
        <h2>Name : {title}</h2>
        <p>Email : {description}</p>
      </div>
    </div>
  );
}

export default UserCard;
