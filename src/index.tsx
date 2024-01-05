import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './app/Home';
import Admin from './admin/Admin';
import Members from './admin/Members';
import CreateAnnouncements from './admin/announcements/CreateAnnouncements';
import { AnnouncementsList } from './admin/announcements/AnnouncementsList';
import EditAnnouncements from './admin/announcements/EditAnnouncements';
import CreatePartners from './admin/partners/CreatePartners';
import { PartnersList } from './admin/partners/PartnersList';
import EditPartners from './admin/partners/EditPartners';
import LoginPage from './app/Login';
import RegisterPage from './app/Register';
import Merch from './app/Merch';
import Order from './app/Order';
import LandingPage from './components/Home/LandingPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/merch" element={<Merch />}></Route>
          <Route path="/order" element={<Order />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/members" element={<Members />}></Route>
          <Route
            path="/admin/announcements"
            element={<AnnouncementsList />}
          ></Route>
          <Route
            path="/admin/create/announcements"
            element={<CreateAnnouncements />}
          ></Route>
          <Route
            path="/admin/edit/announcements/:id"
            element={<EditAnnouncements />}
          ></Route>
          <Route path="/admin/partners" element={<PartnersList />}></Route>
          <Route
            path="/admin/partners/create"
            element={<CreatePartners />}
          ></Route>
          <Route
            path="/admin/partners/edit/:id"
            element={<EditPartners />}
          ></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
