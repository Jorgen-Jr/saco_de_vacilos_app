import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import "./style.css";

import Layout from "../../../components/Layout";

import api from "./../../../services/api";

import Table from "../../../components/Table";
import * as TableActions from "../../../../store/actions/table";

import Toast from "../../../components/Toast";
import Loading from "../../../components/Loading";

import { FormInput } from "../../../components/Form/FormInput";
import { FormCheckbox } from "../../../components/Form/FormCheckbox";

const Users = ({ table, dispatch }) => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [active, setActive] = useState("");
  const [userid, setUserId] = useState("Novo");
  const [formstatus, setFormstatus] = useState("browse");
  const [renderTable, setRenderTable] = useState(false);

  const columns = [
    {
      Header: "Nome",
      accessor: "name",
    },
    {
      Header: "Login",
      accessor: "login",
    },
    {
      Header: "E-Mail",
      accessor: "email",
    },
    {
      Header: "Editar",
      accessor: "id",
    },
  ];

  async function getTableData() {
    await api.get("/users").then((res) => {
      const response = res.data;

      dispatch(TableActions.updateTable(columns, response));
      setRenderTable(true);
    });
  }

  //Renderizar a tabela.
  useEffect(() => {
    if (table.selected_id) {
      updateHandler(table.selected_id);
    } else {
      getTableData();
    }
    //TODO
    // Make function callback for useEffect :)
    // eslint-disable-next-line
  }, [table.selected_id]);

  //Verificar se o nome de usuário está disponível.
  useEffect(() => {
    async function isLoginAvailable() {
      const res = await api
        .get("/users/isLoginAvailable/" + login)
        .then((res) => {
          return res.data;
        });
      return res;
    }
    if (login) {
      let isLoginValid = isLoginAvailable();
      console.log(isLoginValid);
      if (isLoginValid === false) {
        Toast("Login indisponível, favor usar outro login.", "warning");
        console.log("Login indisponível.");
      }
    }
    //TODO
    // Make function callback for useEffect :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  function refreshTable() {
    setRenderTable(false);
    setRenderTable(true);
  }

  async function searchHandler(event) {
    event.preventDefault();
    if (!search) {
      Toast("Preencha o campo de busca", "warning");
      return false;
    }

    let tableData = await api
      .post("/users/search/", {
        query: search,
      })
      .then((res) => {
        return res.data;
      });

    await dispatch(TableActions.updateTable(columns, tableData));

    refreshTable();
  }

  function clearHandler(event) {
    event.preventDefault();

    setUserId("Novo");
    setLogin("");
    setName("");
    setEmail("");
    setActive(false);
    setSearch("");

    if (formstatus === "browse") {
      getTableData();
    }
  }

  function newHandler(event) {
    event.preventDefault();

    setUserId("Novo");

    formStatus("new");
    setFormstatus("new");

    return false;
  }

  async function updateHandler(selectedId) {
    const response = await api.get("users/bypk/" + selectedId);

    const { name, login, email } = response.data;

    formStatus("update");
    setFormstatus("update");

    setUserId(selectedId);
    setLogin(login);
    setName(name);
    setEmail(email);
    setActive(true);
  }

  async function saveHandler(event) {
    event.preventDefault();

    let success = false;

    let response = null;

    switch (formstatus) {
      case "new":
        const password = "302010";

        response = await api.post("/users/", {
          name,
          email,
          login,
          password,
        });

        success = response.status === 200 ? true : false;

        break;
      case "update":
        response = await api.put("/users/" + userid, {
          name,
          email,
          login,
        });

        success = response.status === 200 ? true : false;
        break;
      default:
        success = false;
        break;
    }
    if (!success) {
      Toast("Ocorreu um erro.", "error");
    } else {
      Toast("Registro salvo com sucesso.", "success");

      getTableData();

      formStatus("browse");
    }
  }

  function cancelHandler(event) {
    event.preventDefault();

    getTableData();

    formStatus("browse");

    return false;
  }

  async function downloadReport(event) {
    event.preventDefault();

    const users = await api.get("/userReports").then((res) => {
      return res.data;
    });

    console.log(users);

    if (users) {
      var txt = new Blob(
        [
          users
            .map((item) => {
              return item.login + item.email + item.id + "\n";
            })
            .join(""),
        ],
        { type: "text/plain;charset=utf-8" }
      );

      console.log(txt);

      let today = new Date();

      let TimeStamp =
        String(today.getDate()).padStart(2, "0") +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        today.getFullYear() +
        "-" +
        today.getHours() +
        "h" +
        today.getMinutes() +
        "m";

      let url = window.URL.createObjectURL(txt);

      let a = document.createElement("a");
      a.href = url;

      a.download = "report" + TimeStamp + ".txt";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  function formStatus(formstatus) {
    let div_search = document.getElementById("form-search");
    let div_update = document.getElementById("form-update");
    switch (formstatus) {
      case "new":
        div_update.style = "display: block";
        div_search.style = "display: none";
        break;
      case "update":
        div_update.style = "display: block";
        div_search.style = "display: none";
        break;
      case "browse":
        div_update.style = "display: none";
        div_search.style = "display: block";
        break;
      default:
        div_update.style = "display: none";
        div_search.style = "display: block";
        break;
    }

    setFormstatus(formstatus);
  }

  return (
    <Layout>
      <div className="app-container">
        <h1 className="app-title">Cadastro de Usuários</h1>
        <div className="app-module-container">
          <div className="app-search" id="form-search">
            <h1 className="app-subtitle">Pesquisa:</h1>
            <form className="app-search">
              <input
                type="text"
                className="input input-search"
                placeholder="Entre com sua Busca"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="btn-group">
                <button className="btn-primary" onClick={searchHandler}>
                  Pesquisar
                </button>
                <button className="btn-default" onClick={clearHandler}>
                  Limpar
                </button>
                <button className="btn-success" onClick={newHandler}>
                  Novo
                </button>
                <button className="btn-default" onClick={downloadReport}>
                  Relatório
                </button>
              </div>
            </form>

            <div className="app-grid">
              <h1 className="app-title">Usuários Registrados</h1>
              <div className="app-table">
                {renderTable ? <Table /> : <Loading />}
              </div>
            </div>
          </div>
          <div
            className="app-store"
            id="form-update"
            style={{ display: "none" }}
          >
            <h1 className="app-subtitle">
              Status do Formulário: {formstatus === "new" ? "Novo" : "Edição"}
            </h1>
            <form className="app-form">
              {/* ID do registro */}
              <FormInput
                label="ID"
                name="ID"
                type="text"
                className="input input-id"
                placeholder="ID do Registro"
                disabled="disabled"
                value={userid}
                onChange={(event) => setUserId(event.target.value)}
              />

              {/* Nome do Usuário */}
              <FormInput
                label="Nome:"
                name="name"
                type="text"
                className="input"
                placeholder="Nome do usuário."
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              {/* Email do usuário */}
              <FormInput
                label="E-Mail:"
                name="email"
                className="input"
                placeholder="Email do Usuário"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              {/* Login do usuário */}
              <FormInput
                label="Login:"
                name="login"
                className="input"
                placeholder="Login do usuário."
                value={login}
                onChange={(event) => setLogin(event.target.value)}
              />

              {/* Usuário ativo/inativo */}
              <FormCheckbox
                label="Ativo:"
                name="ativo"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
              />
              {/* Mensagem de aviso */}
              <div className="form-group">
                <p className="label-info">
                  Novos usuários serão criados com a senha padrão{" "}
                  <b>"302010"</b>
                </p>
              </div>
              <div className="btn-group">
                <label className="form-label"></label>
                <button className="btn-success" onClick={saveHandler}>
                  Salvar
                </button>
                <button className="btn-primary" onClick={cancelHandler}>
                  Cancelar
                </button>
                <button className="btn-default" onClick={clearHandler}>
                  Limpar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default connect((state) => ({ table: state.table }))(Users);
