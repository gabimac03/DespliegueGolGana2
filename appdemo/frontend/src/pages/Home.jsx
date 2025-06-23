import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css"; // Asegúrate de que este archivo contenga el CSS que te proporcioné

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Bienvenido a GolGana</h1>
        <p>
          Tu plataforma todo en uno para la gestión y reserva de complejos deportivos. 
          Haz tus reservas de manera rápida, sencilla y eficiente, optimizando el uso de tus instalaciones.
        </p>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🏟️</div>
          <h3>Gestión de Complejos Deportivos</h3>
          <p>
            Administra todos tus complejos deportivos desde un solo lugar. 
            Registra sus características, disponibilidad y horarios de uso.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Reservas Simplificadas</h3>
          <p>
            Sistema intuitivo para crear y administrar reservas, 
            con notificaciones y confirmaciones automáticas.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Análisis y Reportes</h3>
          <p>
            Obtén datos valiosos sobre el uso de tus complejos deportivos, 
            ocupación y rentabilidad con nuestros reportes personalizados.
          </p>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Lo que dicen nuestros usuarios</h2>
        
        <div className="testimonial-card">
          <p className="testimonial-text">
            "GolGana transformó completamente la forma en que gestionamos nuestras instalaciones deportivas. 
            Ahora tenemos todo organizado y accesible desde cualquier dispositivo."
          </p>

          <p className="testimonial-author">- Carlos Mendoza, Administrador de Complejos</p>
         

        </div>
        
        <div className="testimonial-card">
          <p className="testimonial-text">
            "La facilidad para crear reservas y ver la disponibilidad en tiempo real 
            ha hecho que nuestros procesos sean mucho más eficientes."
          </p>

          <p className="testimonial-author">- María González, "Dueña al cubo Futbol"</p>


        </div>
      </section>

      <section className="faq-section">
        <h2>Preguntas frecuentes</h2>
        
        <div className="faq-item">
          <div className="faq-question">¿Cómo puedo registrar un nuevo complejo deportivo?</div>
          <p className="faq-answer">
            Simplemente inicia sesión en tu cuenta, ve a la sección "Administración" y 
            haz clic en "Crear Predio". Completa la información requerida y listo.
          </p>
        </div>
        
        <div className="faq-item">
          <div className="faq-question">¿Puedo gestionar múltiples complejos deportivos desde una sola cuenta?</div>
          <p className="faq-answer">
            ¡Absolutamente! GolGana está diseñado para administrar múltiples complejos deportivos 
            desde una sola interfaz, facilitando la gestión completa de tus instalaciones.
          </p>
        </div>
        
        <div className="faq-item">
          <div className="faq-question">¿Cómo funciona el sistema de reservas?</div>
          <p className="faq-answer">
            Nuestro sistema permite crear reservas en fechas específicas, 
            verificando automáticamente la disponibilidad y enviando notificaciones 
            tanto al propietario como al solicitante.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 GolGana - Sistema de Gestión y Reserva de Complejos Deportivos</p>
        <p>
          <a href="/terminos">Términos y Condiciones</a> | 
          <a href="/privacidad">Política de Privacidad</a> | 
          <a href="/contacto">Contacto</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
