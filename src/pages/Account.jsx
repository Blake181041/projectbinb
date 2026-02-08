import "../styles/auth.css";

export default function Account() {
  return (
    <div className="auth-page">
        <div className="auth-page">
        <div className="auth-glow glow-1" />
        <div className="auth-glow glow-2" />
        </div>
      <div className="auth-card">
        <h1>Account Center</h1>
        <p>Manage your ProjectBinB account</p>

        <input value="username123" disabled />
        <input value="user@email.com" disabled />

        <button>Log out</button>
      </div>
    </div>
  );
}
