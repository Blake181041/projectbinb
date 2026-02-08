import "../styles/auth.css";

export default function Login() {
  return (
    <div className="auth-page">
        <div className="auth-page">
        <div className="auth-glow glow-1" />
        <div className="auth-glow glow-2" />
        </div>
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Sign in to your ProjectBinB account</p>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <div className="auth-link">
          No account? <a href="/signup">Create one</a>
        </div>
      </div>
    </div>
  );
}
