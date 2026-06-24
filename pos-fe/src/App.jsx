import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CashierMainPage from './pages/cashier/CashierMainPage';

function App() {
  const [role, setRole] = useState(null);

  if (role === null) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <Routes>
          <Route path="/*" element={<LoginPage onLogin={(r) => setRole(r)} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main>
        <Routes>
          <Route path="/admin" element={role === 'admin' ? <MainPage onLogout={() => setRole(null)} /> : <Navigate to="/" />} />
          <Route path="/cashier" element={role === 'cashier' ? <CashierMainPage onLogout={() => setRole(null)} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={role === 'admin' ? '/admin' : '/cashier'} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
