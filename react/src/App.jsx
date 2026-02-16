import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import { HomePage, ResumePage, NotFound } from './pages/index.jsx';
import BlogPage from './pages/BlogPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
