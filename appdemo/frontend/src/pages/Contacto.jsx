import React from "react";
import "../style/Contacto.css"; // Asegurate que este archivo exista

const Contacto = () => {
  return (
    <div className="contacto-container">
      <section className="contacto-header">
        <h1>Contacto</h1>
        <p>¿Tenés alguna duda o consulta? ¡Escribinos!</p>
      </section>

      <form className="contacto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" placeholder="Tu email" />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribí tu mensaje..."></textarea>
        </div>

        <button type="submit" className="contacto-btn">Enviar</button>
      </form>

      <footer className="footer">
        <p>© 2025 GolGana - Sistema de Gestión y Reserva de Complejos Deportivos</p>
        <p>
          <a href="/terminos">Términos y Condiciones</a> |{" "}
          <a href="/privacidad">Política de Privacidad</a> |{" "}
          <a href="/contacto">Contacto</a>
        </p>
      </footer>
    </div>
  );
};

export default Contacto;

