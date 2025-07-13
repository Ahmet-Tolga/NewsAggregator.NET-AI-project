import React, { useEffect, useState } from 'react'; // useState'i import ettik
import { Route, Routes } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { Container, Row, Col } from 'reactstrap';
import Home from '../Home/Home';
import SideBar from '../sidebar/SideBar';
import DetailModal from '../common/DetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, getNewsAction } from '../../redux/actions/NewsAction';

const App = () => {
  const dispatch = useDispatch();
  const newsSource = useSelector((state => state.newsSourceReducer));
  const selectedCategory = useSelector((state => state.SelectedCategoryReducer));
  const [isLoadingNews,setIsLoadingNews]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url=newsSource.url + selectedCategory;

        dispatch(fetchNews(url));
      } catch (error) {
        console.error("An error occured when news are being pulling!:", error);
      } 
    };
    fetchData();
  }, [newsSource, selectedCategory, dispatch]);

  return (
    <div className="app-container">
      <Navbar />

      <Container fluid>
        <Row>
          <DetailModal />
          <Col md={3} className="sidebar-col">
            <SideBar />
          </Col>

          <Col md={9} className="main-content-col">
            <Routes>
              <Route path='/' element={<Home></Home>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;