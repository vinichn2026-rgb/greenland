import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AppContext = createContext();

const API = '/api';

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
  const [savedPlots, setSavedPlots] = useState([1]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  // Selected Property for details page
  const [selectedPlotId, setSelectedPlotId] = useState(1);

  // Real Estate listings list — loaded from MySQL via API
  const [plotsList, setPlotsList] = useState([]);
  const [plotsLoading, setPlotsLoading] = useState(true);
  const [plotsError, setPlotsError] = useState('');

  // Post Property Modal control
  const [postPropertyModalOpen, setPostPropertyModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState({
    location: '',
    landType: 'All Types',
    budget: '',
    minArea: '',
    maxArea: ''
  });

  // ─── Fetch all plots from the MySQL API ───────────────────────────────────
  const fetchPlots = useCallback(async () => {
    setPlotsLoading(true);
    setPlotsError('');
    try {
      const res = await fetch(`${API}/plots`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setPlotsList(data);
      setNotificationsCount(data.length > 0 ? 1 : 0);
    } catch (err) {
      console.error('fetchPlots error:', err);
      setPlotsError(
        'Unable to load listings from the database. Is the server running?'
      );
      // Graceful fallback: empty list so the UI doesn't crash
      setPlotsList([]);
    } finally {
      setPlotsLoading(false);
    }
  }, []);

  // Load plots on mount
  useEffect(() => {
    fetchPlots();
  }, [fetchPlots]);

  // ─── Toggle saved / wishlist ──────────────────────────────────────────────
  const toggleSavePlot = (plotId) => {
    setSavedPlots((prev) =>
      prev.includes(plotId)
        ? prev.filter(id => id !== plotId)
        : [...prev, plotId]
    );
  };

  // ─── Add a new plot — POST to MySQL, then refresh list ───────────────────
  const addPlot = async (newPlot) => {
    try {
      // Build the payload expected by POST /api/plots
      const payload = {
        title:    newPlot.title,
        location: newPlot.location,
        price:    newPlot.price,
        priceVal: parseInt(newPlot.price.replace(/[^\d]/g, '')) || 0,
        area:     newPlot.area,
        areaVal:  parseInt(newPlot.area) || 0,
        road:     newPlot.road,
        facing:   newPlot.facing,
        tag:      newPlot.tag,
        tagClass: newPlot.tag.toLowerCase().includes('approved')
          ? 'approved'
          : newPlot.tag.toLowerCase().includes('corner')
            ? 'corner'
            : newPlot.tag.toLowerCase().includes('premium')
              ? 'premium'
              : 'hot',
        landType: 'Residential Plot',
        images:   newPlot.images || (newPlot.image ? [newPlot.image] : []),
        features: newPlot.features || {},
      };

      const res = await fetch(`${API}/plots`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save listing');
      }

      // Refresh the list so the new plot appears from the DB
      await fetchPlots();
      setNotificationsCount(prev => prev + 1);
    } catch (err) {
      console.error('addPlot error:', err);
      // Surface error to the user by keeping the modal open
      throw err;
    }
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
        plotsLoading,
        plotsError,
        fetchPlots,
        addPlot,
        postPropertyModalOpen,
        setPostPropertyModalOpen,
        searchQuery,
        setSearchQuery,
        handleSearch,
        selectedPlotId,
        setSelectedPlotId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
