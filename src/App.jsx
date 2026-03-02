import { Navigate, Route, Routes } from "react-router-dom";
import DocsLayout from "./components/DocsLayout";
import DocsPage from "./pages/DocsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/docs/overview" replace />} />

      <Route path="/docs" element={<DocsLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path=":slug" element={<DocsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/docs/overview" replace />} />
    </Routes>
  );
}
