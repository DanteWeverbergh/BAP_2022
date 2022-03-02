import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Home - Gains';
  }, []);

  return (
    <>
      <div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div class="font-bold text-xl mb-2">New 1RM</div>
            <div>
              <p className="text-gray-700 text-base">
                kjmdjkjqksmjdkjqsdkjqksjdqdsmlkjkqjsdkjmk
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex">
              <div className="">💪</div>
              <div className="ml-6">share</div>
              <div className="ml-6">Comment</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
