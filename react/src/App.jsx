import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import { HomePage, ResumePage, NotFound } from './pages/index.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
