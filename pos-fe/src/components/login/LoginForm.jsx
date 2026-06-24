import { useState } from "react";
import useInput from "../../hooks/useInput.js";

function LoginForm({ onLogin }) {
  const [username, onUsernameChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setLoading(true);
      onLogin("admin");
      setLoading(false);
    } else if (username === "cashier" && password === "cashier") {
      setLoading(true);
      onLogin("cashier");
      setLoading(false);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        id="username"
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
        required
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
