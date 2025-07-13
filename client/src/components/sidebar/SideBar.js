import React from "react";
import "../../styles/SideBar.css";
import { NavLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setNewsSourceAction } from "../../redux/actions/NewsSourceActions";
import { SOURCE_ARRAY } from "../../constants/urls";
import { setSimilarNews } from "../../redux/actions/SimilarNewsActions";

const SideBar = () => {
  const dispatch = useDispatch();
  const newsSource = useSelector((state) => state.newsSourceReducer);

  const handleOnClickSource = (source) => {
    dispatch(setSimilarNews({ similar_news: [] }));
    dispatch(setNewsSourceAction(source));
  };

  return (
    <div className="sidebar content-below-navbar">
      <div className="sidebar-header">
        <h3>HABERIN OLSUN</h3>
      </div>
      <div className="sidebar-content">
        <ul>
          {SOURCE_ARRAY.map((source) => {
            return (
              <li key={source.text}>
                <NavLink
                  active={source.text === newsSource.text}
                  onClick={() => handleOnClickSource(source)}
                  style={{ cursor: "pointer" }}
                >
                  {source.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;