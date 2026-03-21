import React from "react";
import { Link } from "react-router-dom";

export default function GibbyAI() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Space%20Grotesk:700|Space%20Grotesk:400');

        :root {
          --m: 0.85rem;

          --red: #FF6565;
          --pink: #FF64F9;
          --purple: #6B5FFF;
          --blue: #4D8AFF;
          --green: #5BFF89;
          --yellow: #FFEE55;
          --orange: #FF6D1B;
        }

        .gibby-link {
          text-decoration: none;
          color: inherit;
          display: inline-block;
        }

        .gibby-btn {
          border: calc(0.08 * var(--m)) solid transparent;
          position: relative;
          color: #F3F3F3;
          font-family: 'Space Grotesk';
          font-size: var(--m);
          border-radius: calc(0.7 * var(--m));
          padding: calc(0.5 * var(--m)) calc(1 * var(--m));
          cursor: pointer;
          background:
            linear-gradient(#121213, #121213),
            linear-gradient(#121213 50%, rgba(18,18,19,0.6) 80%, rgba(18,18,19,0)),
            linear-gradient(90deg,
              var(--orange),
              var(--yellow),
              var(--green),
              var(--blue),
              var(--purple),
              var(--pink),
              var(--red)
            );
          background-origin: border-box;
          background-clip: padding-box, border-box, border-box;
          background-size: 200%;
          animation: animate 2s infinite linear;
        }

        .gibby-btn::before {
          content: '';
          position: absolute;
          left: 20%;
          bottom: -20%;
          width: 60%;
          height: 30%;
          z-index: -1;
          background: linear-gradient(90deg,
            var(--orange),
            var(--yellow),
            var(--green),
            var(--blue),
            var(--purple),
            var(--pink),
            var(--red)
          );
          background-size: 200%;
          filter: blur(calc(0.8 * var(--m)));
          animation: animate 2s infinite linear;
        }

        .gibby-btn:hover,
        .gibby-btn:hover::before {
          animation: animate 0.5s infinite linear;
        }

        @keyframes animate {
          0% { background-position: 0%; }
          100% { background-position: 200%; }
        }
      `}</style>

      <Link to="/gibbyai" className="gibby-link">
        <button className="gibby-btn">Gibby AI</button>
      </Link>
    </>
  );
}
