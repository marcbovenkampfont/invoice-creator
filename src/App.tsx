import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './features/home/Home';
import Invoices from './features/invoices/Invoices';
import Clients from './features/clients/Clients';
import BankAccounts from './features/bankAccounts/BankAccounts';
import Settings from './features/settings/Settings';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="clients" element={<Clients />} />
          <Route path="bank-accounts" element={<BankAccounts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
