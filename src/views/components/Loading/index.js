import React from 'react';

import Lottie from 'react-lottie';

import './style.css';

import waves from './../../../assets/animations/waves.json';

export default function Loading() {
  return (
    <>
      <div className="loading-container">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: waves,
            rendererSettings:{
              className: "lottie-loading-animation",
              viewBoxOnly: true,
            }
          }}
          height="400"
          width="400"
        />
      </div>
    </>
  );
}
