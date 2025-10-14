import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CountryInfo from './pages/CountryInfo';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/country/:code" element={<CountryInfo />} />
      </Route>
    </Routes>
  );
}

export default App;