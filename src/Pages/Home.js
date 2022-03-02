import React, { useEffect } from 'react';
import SocialCard from '../Components/SocialCard';

function Home() {
  useEffect(() => {
    document.title = 'Home - Gains';
  }, []);

  return (
    <>
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
    </>
  );
}

export default Home;
