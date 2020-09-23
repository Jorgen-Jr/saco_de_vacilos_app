import React from "react";

import Lottie from "react-lottie";

import UnderConstructionAnimation from "../../../assets/animations/underconstruction.json";

import Layout from "../Layout";

import "./style.css";

const UnderConstruction = () => {
  return (
    <Layout>
      <div className="app-container">
        <h1 className="app-title">Sob Construção!</h1>
        <div className="app-module-container">
          <h1 className="app-subtitle">Esta página ainda não está pronta.</h1>

          <div className="constructing-container">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: UnderConstructionAnimation,
                rendererSettings: {
                  className: "lottie-constructing-animation",
                  viewBoxOnly: true,
                  //   preserveAspectRatio: 'xMidYMid slice'
                },
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnderConstruction;
