import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";

export default function Login() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", { id });

      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", response.data.name);

      history.push("/profile");
    } catch (error) {
      alert("Erro ao realizar login. Verifique os dados e tente novamente");
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="Be the hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não Tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
