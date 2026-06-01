import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NetworkGuard } from './components/NetworkGuard'
import { RequireAuth } from './components/RequireAuth'
import { RequireGuest } from './components/RequireGuest'
import { BalancePage } from './pages/BalancePage'
import { DepositPage } from './pages/DepositPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NetworkErrorPage } from './pages/NetworkErrorPage'
import { NoTradePage } from './pages/NoTradePage'
import { OpenAccountPage } from './pages/OpenAccountPage'
import { RecordsPage } from './pages/RecordsPage'
import { StatementPage } from './pages/StatementPage'
import { StatsPage } from './pages/StatsPage'
import { TransferPage } from './pages/TransferPage'
import { WithdrawPage } from './pages/WithdrawPage'

/**
 * 路由总入口：将各业务功能拆分到独立页面，并保留网络异常页与兜底重定向。
 */
function App() {
  return (
    <BrowserRouter>
      <NetworkGuard />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <RequireGuest>
              <LoginPage />
            </RequireGuest>
          }
        />
        <Route
          path="/open-account"
          element={
            <RequireGuest>
              <OpenAccountPage />
            </RequireGuest>
          }
        />
        <Route
          path="/deposit"
          element={
            <RequireAuth>
              <DepositPage />
            </RequireAuth>
          }
        />
        <Route
          path="/withdraw"
          element={
            <RequireAuth>
              <WithdrawPage />
            </RequireAuth>
          }
        />
        <Route
          path="/transfer"
          element={
            <RequireAuth>
              <TransferPage />
            </RequireAuth>
          }
        />
        <Route
          path="/balance"
          element={
            <RequireAuth>
              <BalancePage />
            </RequireAuth>
          }
        />
        <Route
          path="/records"
          element={
            <RequireAuth>
              <RecordsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/statement"
          element={
            <RequireAuth>
              <StatementPage />
            </RequireAuth>
          }
        />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/no-trade" element={<NoTradePage />} />
        <Route path="/network-error" element={<NetworkErrorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
