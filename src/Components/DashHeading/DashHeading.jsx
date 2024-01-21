import "./DashHeading.css";
function DashHeading({ children }) {
  return (
    <>
      <div className="assignment-nav-wrap">
        <ul
          className="flex justify-between nav nav-pills"
          id="pills-tab-1"
          role="tablist"
        >
          <li className="nav-item">
            <button className="text-left nav-link active">{children}</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DashHeading;
