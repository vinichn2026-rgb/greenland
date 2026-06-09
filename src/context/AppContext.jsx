import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const INITIAL_PLOTS = [
  {
    id: 1,
    image: '/images/plot1.png',
    tag: 'DTCP Approved',
    tagClass: 'approved',
    title: '1200 Sq.ft Plot',
    location: 'Oragadam, Chennai',
    road: '30ft Road',
    facing: 'East Facing',
    price: '₹ 18,00,000',
    priceVal: 1800000,
    areaVal: 1200,
    landType: 'Residential Plot',
    features: { dtcp: true, rera: false, corner: false, gated: false, road30: true }
  },
  {
    id: 2,
    image: '/images/plot2.png',
    tag: 'Corner Plot',
    tagClass: 'corner',
    title: '2400 Sq.ft Plot',
    location: 'Vandalur, Chennai',
    road: '24ft Road',
    facing: 'North Facing',
    price: '₹ 32,00,000',
    priceVal: 3200000,
    areaVal: 2400,
    landType: 'Residential Plot',
    features: { dtcp: true, rera: false, corner: true, gated: false, road30: false }
  },
  {
    id: 3,
    image: '/images/plot3.png',
    tag: 'Premium Location',
    tagClass: 'premium',
    title: '1500 Sq.ft Plot',
    location: 'Thiruporur, Chennai',
    road: '30ft Road',
    facing: 'East Facing',
    price: '₹ 22,50,000',
    priceVal: 2250000,
    areaVal: 1500,
    landType: 'Residential Plot',
    features: { dtcp: true, rera: true, corner: false, gated: true, road30: true }
  },
  {
    id: 4,
    image: '/images/plot4.png',
    tag: 'Hot Deal',
    tagClass: 'hot',
    title: '2000 Sq.ft Plot',
    location: 'Kelambakkam, Chennai',
    road: '24ft Road',
    facing: 'North Facing',
    price: '₹ 28,50,000',
    priceVal: 2850000,
    areaVal: 2000,
    landType: 'Residential Plot',
    features: { dtcp: true, rera: false, corner: false, gated: false, road30: false }
  }
];

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
  const [savedPlots, setSavedPlots] = useState([1]);
  const [notificationsCount, setNotificationsCount] = useState(3);
  
  // Selected Property for details page
  const [selectedPlotId, setSelectedPlotId] = useState(1);

  // Real Estate listings lists
  const [plotsList, setPlotsList] = useState(INITIAL_PLOTS);

  // Post Property Modal control
  const [postPropertyModalOpen, setPostPropertyModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    landType: 'All Types',
    budget: '',
    minArea: '',
    maxArea: ''
  });

  const toggleSavePlot = (plotId) => {
    setSavedPlots((prev) => 
      prev.includes(plotId) 
        ? prev.filter(id => id !== plotId) 
        : [...prev, plotId]
    );
  };

  const addPlot = (newPlot) => {
    // Generate new ID and format standard values
    const cleanPlot = {
      ...newPlot,
      id: plotsList.length + 1,
      priceVal: parseInt(newPlot.price.replace(/[^\d]/g, '')) || 1500000,
      areaVal: parseInt(newPlot.area) || 1200,
      tagClass: newPlot.tag.toLowerCase().includes('approved') 
        ? 'approved' 
        : newPlot.tag.toLowerCase().includes('corner') 
          ? 'corner' 
          : newPlot.tag.toLowerCase().includes('premium') 
            ? 'premium' 
            : 'hot'
    };

    setPlotsList(prev => [cleanPlot, ...prev]);
    setNotificationsCount(prev => prev + 1);
  };

  const handleSearch = () => {
    setActivePage('buyland');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        activeTab,
        setActiveTab,
        savedPlots,
        toggleSavePlot,
        notificationsCount,
        setNotificationsCount,
        plotsList,
        addPlot,
        postPropertyModalOpen,
        setPostPropertyModalOpen,
        searchQuery,
        setSearchQuery,
        handleSearch,
        selectedPlotId,
        setSelectedPlotId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
