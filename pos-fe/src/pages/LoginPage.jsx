import LoginForm from "../components/LoginForm";

function LoginPage({ onLogin }) {
  return (
    <section>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          POS Login
        </h2>
        <LoginForm onLogin={onLogin} />
      </div>
    </section>
  );
}

export default LoginPage;
