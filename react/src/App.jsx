import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import { HomePage, ResumePage, NotFound } from './pages/index.jsx';
import BlogPage from './pages/BlogPage.jsx';
import AiTutorPage from './pages/AiTutorPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="project/cognitive-adaptive-ai-tutor" element={<AiTutorPage />} />
        <Route path="project/:projectId" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
