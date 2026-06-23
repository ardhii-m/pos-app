function MainPage({ onLogout }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600">Authentication Successful</h2>
        <p className="text-gray-500 mt-2">Welcome, admin!</p>
        <button
          onClick={onLogout}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MainPage;
