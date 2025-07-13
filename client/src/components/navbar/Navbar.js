import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import { setSelectedCategoryAction } from "../../redux/actions/SelectedCategoryAction";
import { COMMON_CATEGORIES } from "../../constants/categories";
import "../../styles/Navbar.css";
import { setSimilarNews } from "../../redux/actions/SimilarNewsActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const similarNewsState = useSelector((state) => state.SimilarNewsReducer);
    const selectedCategory = useSelector((state) => state.SelectedCategoryReducer);
    const newsSource = useSelector((state) => state.newsSourceReducer);
    const newsTitle = useSelector((state) => state.NewsTitleReducer);

    const handleOnClickCategory = (category) => {
        dispatch(setSimilarNews({ similar_news: [] }));
        dispatch(setSelectedCategoryAction(category));
    };

    return (
        <div className="navbar-container fixed-top">
            <div className="navbar-content">
                <Nav pills className="custom-nav">
                    {COMMON_CATEGORIES?.map((category, index) => (
                        <NavItem key={index} className="nav-item">
                            <NavLink
                                className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => handleOnClickCategory(category)}
                            >
                                {category}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>

                <h6 className="news-heading">{newsTitle}{similarNewsState.similarNews.similar_news.length > 0 ? "" : "-" + newsSource.text}</h6>
            </div>
        </div>
    );
};

export default Navbar;