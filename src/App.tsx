import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppLayout from './pages/AppLayout';
import ChatPage from './pages/ChatPage';
import ProjectsPage from './pages/ProjectsPage';
import FilesPage from './pages/FilesPage';
import SettingsPage from './pages/SettingsPage';

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/app"
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >
        <Route index element={<ChatPage />} />
        <Route path="c/:id" element={<ChatPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectsPage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
