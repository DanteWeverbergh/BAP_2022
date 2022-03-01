import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Home - Gains';
  }, []);

  return (
    <>
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">New 1RM</h5>
            <p className="card-text ">
              kjmdjkjqksmjdkjqsdkjqksjdqdsmlkjkqjsdkjmk
            </p>
            <div className="icons">
              <div className="icon">💪</div>
              <div className="icon">share</div>
              <div className="icon">Comment</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
