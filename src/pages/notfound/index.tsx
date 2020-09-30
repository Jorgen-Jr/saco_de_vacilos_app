import React, { useEffect } from "react";

import Lottie from "react-lottie";

import NotFoundAnimation from "../../assets/animations/notfound.json";

import Layout from "../../components/Layout";

const NotFound = () => {
  useEffect(() => {
    // document.title="404 - Não Encontrado";
  });

  return (
    <Layout>
      <div className="app-container">
        <h1 className="app-title">404 Não encontrado!</h1>
        <div className="app-module-container">
          <h1 className="app-subtitle">
            Não conseguimos encontrar sua página, ela pode ter sido movida ou
            removida.
          </h1>

          <div>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: NotFoundAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
