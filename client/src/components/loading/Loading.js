import React from 'react';
import '../../styles/Loading.css';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Yükleniyor...</p>
    </div>
  );
};

export default LoadingPage;