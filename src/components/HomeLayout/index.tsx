import React from "react";

interface HomeLayoutProps {}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="login-content">
      <div className="login-background"></div>
      <div className="login-background-2"></div>
      <div className="app-logo">
        <div className="text-intro">
          <h1 style={{ fontWeight: "bold" }}>
            Rede social apenas para os vacilões.
          </h1>
          <h2 style={{ fontWeight: "lighter" }}>
            Se você nunca vacilou, nem crie uma conta.{" "}
            <span className="text-tiny">Mas sabemos que já :)</span>
          </h2>
        </div>
        <div className="logo-div">
          {/* <img src={logo} alt="Logo" className="logo-img" /> */}
        </div>
      </div>
      <div className="form-container">
        <div className="login-welcome">
          <h1 className="login-title">Registrar</h1>
          <p>Favor inserir seus dados de registro.</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
