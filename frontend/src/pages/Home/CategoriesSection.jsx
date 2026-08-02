import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import WhyChooseSection from './WhyChooseSection';
import ReviewsSection from './ReviewsSection';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/feedbacks.php?action=getApproved`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFeedbacks(data.feedbacks || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <HeroSection />
      <CategoriesSection />
      <WhyChooseSection />
      <ReviewsSection feedbacks={feedbacks} />
    </div>
  );
};

export default Home;
