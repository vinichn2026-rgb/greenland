import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuyLand from './pages/BuyLand';
import LandDetails from './pages/LandDetails';
import SellLand from './pages/SellLand';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import LimitationOfLiability from './pages/LimitationOfLiability';
import WhyUs from './pages/WhyUs';
import Register from './pages/Register';
import IceSheet from './pages/IceSheet';
import Culture from './pages/Culture';
import PostPropertyModal from './components/PostPropertyModal';

// The inner app layout that consumes context
const AppLayout = () => {
  const { activePage } = useContext(AppContext);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'buyland':
        return <BuyLand />;
      case 'landdetails':
        return <LandDetails />;
      case 'sellland':
        return <SellLand />;
      case 'aboutus':
        return <AboutUs />;
      case 'login':
        return <Login />;
      case 'contact':
        return <Contact />;
      case 'terms':
        return <TermsAndConditions />;
      case 'liability':
        return <LimitationOfLiability />;
      case 'whyus':
        return <WhyUs />;
      case 'register':
        return <Register />;
      case 'icesheet':
        return <IceSheet />;
      case 'culture':
        return <Culture />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      
      {/* Property Posting Form Overlay */}
      <PostPropertyModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

export default App;
