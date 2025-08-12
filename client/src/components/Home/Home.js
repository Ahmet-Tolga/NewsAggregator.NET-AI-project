import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button, Card, CardBody, Row, CardTitle, Col, Badge,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert
} from "reactstrap";
import { BsChatLeft } from 'react-icons/bs';
import { setSelectedNewAction } from "../../redux/actions/SelectedNewActions";
import { openModalAction } from "../../redux/actions/DetailModalActions";
import "../../styles/Home.css";
import { SOURCE_ARRAY } from "../../constants/urls";
import { fetchSimilarNews } from "../../redux/actions/SimilarNewsActions";
import LoadingPage from "../loading/Loading";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import { setRelatedNewsData } from "../../redux/actions/RelatedNewsDataActions";

const THRESHOLD_VALUES = [0.5, 0.6, 0.7, 0.8];

const Home = (props) => {
    const dispatch = useDispatch();
    const { news } = useSelector((state => state.NewsReducer));
    const { isPageLoading, globalError } = useSelector(state => state.UIStatusReducer);
    const { similarNews } = useSelector((state => state.SimilarNewsReducer));
    const newsSource = useSelector((state => state.newsSourceReducer));
    const selectedCategory = useSelector((state => state.SelectedCategoryReducer));

    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedThreshold, setSelectedThreshold] = useState();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleDropdown = (index) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleThresholdSelect = (threshold, title) => {
        setSelectedThreshold(threshold);
        handleOnClickCompare(title, threshold);
    };

    const handleOnClickDetail = (description) => {
        dispatch(setSelectedNewAction(description));
        dispatch(openModalAction());
    };

    function parseCustomDate(dateString) {
        const cleanedDate = dateString.replace(/en-US$/, '').trim();

        const monthsTrToEn = {
          'Oca': 'Jan', 'Şub': 'Feb', 'Mar': 'Mar', 'Nis': 'Apr', 'May': 'May',
          'Haz': 'Jun', 'Tem': 'Jul', 'Ağu': 'Aug', 'Eyl': 'Sep', 'Eki': 'Oct',
          'Kas': 'Nov', 'Ara': 'Dec'
        };

        const dateParts = cleanedDate.split(' ');
        if (dateParts.length >= 5) {
          dateParts[2] = monthsTrToEn[dateParts[2]] || dateParts[2];
          return new Date(dateParts.slice(1).join(' '));
        }

        return new Date(cleanedDate);
      }

    const handleOnClickCompare = async (title, threshold) => {
        const url = "http://localhost:8000/find-similar";
        const sourcesToScan = SOURCE_ARRAY.filter(source => source.text !== newsSource.text);

        try {
            const fetchPromises = sourcesToScan.map(source =>
                fetch(source.url + selectedCategory).then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status} from ${source.text}`);
                    }
                    return res.json();
                })
            );
            const results = await Promise.all(fetchPromises);
            const news_list = results.flatMap(sourceNewsArray =>
                sourceNewsArray.map(newsItem => ({
                    title: newsItem.title,
                    description: newsItem.description,
                    imgUrl: newsItem.imgUrl,
                    pubDate: newsItem.pubDate,
                    link: newsItem.link,
                    source: newsItem.source
                }))
            );

            const data = {
                target_title: title,
                news_list: news_list,
                threshold: threshold
            };

            dispatch(fetchSimilarNews(url, data));

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChatButtonClick=(data)=>{
        dispatch(setRelatedNewsData(data));
        setIsChatOpen(!isChatOpen);
    }

    const findAllNews = (newsToDisplay) => {
        return (
            <div className="p-3 home-container content-below-navbar">
                <Row className="g-4">
                    {newsToDisplay?.map((item, index) => {
                        return (
                            <Col key={index} xl={4} lg={4} md={6} sm={12} className="mb-4">
                                <Card className="h-100 news-card">
                                    <div className="card-img-container">
                                        <img
                                            alt={item.title}
                                            src={item.imgUrl || 'https://via.placeholder.com/300x200?text=Haber+Resmi'}
                                            className="card-img"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=Resim+Yok'
                                            }}
                                        />
                                    </div>
                                    <CardBody className="d-flex flex-column">
                                        <div className="mb-2">
                                            <Badge color="secondary" pill className="source-badge">
                                                {similarNews && similarNews.similar_news.length > 0 ? item.source : item.category}
                                            </Badge>
                                            <Badge color="light" pill className="date-badge">
                                                {(() => {
                                                    try {
                                                    const date = parseCustomDate(item.pubDate);
                                                    return isNaN(date.getTime())
                                                        ? "Tarih yok"
                                                        : date.toLocaleDateString('tr-TR');
                                                    } catch {
                                                    return "Tarih yok";
                                                    }
                                                })()}
                                                </Badge>
                                        </div>

                                        <CardTitle tag="h5" className="card-title">
                                            {item.title}
                                        </CardTitle>

                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center button-group">
                                                <Button
                                                    color="outline-primary"
                                                    className="detail-btn"
                                                    onClick={() => handleOnClickDetail(item.description)}
                                                >
                                                    Detay
                                                </Button>
                                                <Button
                                                    color="outline-secondary"
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="source-btn"
                                                >
                                                    Kaynak
                                                </Button>
                                                <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)} direction="up">
                                                    <DropdownToggle caret color="primary" className="compare-btn">
                                                        Karşılaştır
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        {THRESHOLD_VALUES.map(threshold => (
                                                            <DropdownItem
                                                                key={threshold}
                                                                onClick={() => handleThresholdSelect(threshold, item.title)}
                                                                active={selectedThreshold === threshold}
                                                            >
                                                                {threshold}
                                                            </DropdownItem>
                                                        ))}
                                                    </DropdownMenu>
                                                </Dropdown>

                                                <Button
                                                    color="info"
                                                    className="chat-toggle-button"
                                                    onClick={() => handleChatButtonClick(item.title+item.description)}
                                                >
                                                   <BsChatLeft />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>);
    }

    return (
        <>
            {isPageLoading ? <LoadingPage /> : (
                globalError ? (
                    <div className="p-3 home-container content-below-navbar">
                        <Alert color="danger">Hata: {globalError}</Alert>
                        {news && news.length > 0 && findAllNews(news)}
                    </div>
                ) : (
                    similarNews && similarNews.similar_news.length > 0 ? (
                        findAllNews(similarNews.similar_news)
                    ) : (
                        findAllNews(news)
                    )
                )
            )}

            <ChatSidebar isOpen={isChatOpen} toggleChat={() => setIsChatOpen(!isChatOpen)} />
        </>
    );
}

export default Home;
