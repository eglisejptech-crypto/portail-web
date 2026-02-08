import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import ScrollToTop from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import UsersPage from './pages/dashboard/users/UsersPage';
import { UserDetails } from './pages/dashboard/users/UserDetails';
import { CreateUser } from './pages/dashboard/users/CreateUser';
import { EditUser } from './pages/dashboard/users/EditUser';
import MinistriesPage from './pages/dashboard/ministries/MinistriesPage';
import MinistryDetails from './pages/dashboard/ministries/MinistryDetails';
import CreateMinistries from './pages/dashboard/ministries/CreateMinistries';
import EditMinistry from './pages/dashboard/ministries/EditMinistry';
import FamillesImpactPage from './pages/dashboard/famillesImpact/FamillesImpactPage';
import FamilleImpactDetails from './pages/dashboard/famillesImpact/FamilleImpactDetails';
import CreateFamilleImpact from './pages/dashboard/famillesImpact/CreateFamilleImpact';
import EditFamilleImpact from './pages/dashboard/famillesImpact/EditFamilleImpact';
import EventPage from './pages/dashboard/events/EventPage';
import EventDetails from './pages/dashboard/events/EventDetails';
import CreateEvent from './pages/dashboard/events/CreateEvent';
import EditEvent from './pages/dashboard/events/EditEvent';
import WeeklyVersePage from './pages/dashboard/weeklyVerses/WeeklyVersePage';
import WeeklyVerseDetails from './pages/dashboard/weeklyVerses/WeeklyVerseDetails';
import CreateWeeklyVerse from './pages/dashboard/weeklyVerses/CreateWeeklyVerse';
import EditWeeklyVerse from './pages/dashboard/weeklyVerses/EditWeeklyVerse';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }>
            <Route path="users" element={<UsersPage />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/:id/edit" element={<EditUser />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="ministries" element={<MinistriesPage />} />
            <Route path="ministries/create" element={<CreateMinistries />} />
            <Route path="ministries/:id" element={<MinistryDetails />} />
            <Route path="ministries/:id/edit" element={<EditMinistry />} />
            <Route path="familles-impact" element={<FamillesImpactPage />} />
            <Route path="familles-impact/create" element={<CreateFamilleImpact />} />
            <Route path="familles-impact/:id" element={<FamilleImpactDetails />} />
            <Route path="familles-impact/:id/edit" element={<EditFamilleImpact />} />
            <Route path="events" element={<EventPage />} />
            <Route path="events/create" element={<CreateEvent />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="events/:id/edit" element={<EditEvent />} />
            <Route path="weeklyVerses" element={<WeeklyVersePage />} />
            <Route path="weeklyVerses/create" element={<CreateWeeklyVerse />} />
            <Route path="weeklyVerses/:id" element={<WeeklyVerseDetails />} />
            <Route path="weeklyVerses/:id/edit" element={<EditWeeklyVerse />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
