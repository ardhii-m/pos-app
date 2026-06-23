import { useState } from "react";
import useInput from "../hooks/useInput.js";

function LoginForm({ onLogin }) {
  const [username, onUsernameChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin();
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
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
