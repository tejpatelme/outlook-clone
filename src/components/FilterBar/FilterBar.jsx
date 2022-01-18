import { useDispatch, useSelector } from "react-redux";
import { changeActiveTab } from "../../features/email/emailsSlice";
import "./filterBar.css";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.emails);
  const tabs = ["All", "Unread", "Read", "Favorites"];

  const handleTabClick = (tab) => {
    dispatch(changeActiveTab({ tab }));
  };

  return (
    <div className="filter-bar">
      <span>Filter By:</span>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`filter-button ${activeTab === tab && "active"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
