import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';


function App() {
  const [authedUser, setAuthedUser] = useState(null);

  if (authedUser === null) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <Routes>
          <Route path="/*" element={<LoginPage onLogin={() => setAuthedUser(true)} />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main>
        <Routes>
          <Route
            path="/"
            element={<MainPage onLogout={() => setAuthedUser(null)} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
