import "../styles/auth.css";

export default function Signup() {
  return (
    <div className="auth-page">
        <div className="auth-page">
        <div className="auth-glow glow-1" />
        <div className="auth-glow glow-2" />
        </div>
      <div className="auth-card">
        <h1>Create account</h1>
        <p>Join ProjectBinB</p>

        <input placeholder="Username" />
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Sign Up</button>

        <div className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </div>
        </div>
      </div>
  );
}
