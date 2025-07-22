import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import SearchPage from "./pages/SearchPage"
import ResultsPage from "./pages/ResultsPage"
import LeadsPage from "./pages/LeadsPage"
import HistoryPage from "./pages/HistoryPage"
import LeadDetailPage from "./pages/LeadDetailPage"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/lead/:id" element={<LeadDetailPage />} />
      </Routes>
    </Layout>
  )
}

export default App
