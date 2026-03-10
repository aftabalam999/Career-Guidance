import React, { createContext, useState, useContext, useEffect } from 'react';

const CollegeContext = createContext();

export const useColleges = () => useContext(CollegeContext);

export const CollegeProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [savedColleges, setSavedColleges] = useState([]);

  // Load compare list from localStorage if needed
  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) setCompareList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (college) => {
    if (compareList.length >= 3) {
      alert("You can compare up to 3 colleges at a time.");
      return;
    }
    if (compareList.find(c => c._id === college._id)) {
      alert("College already in comparison list.");
      return;
    }
    setCompareList([...compareList, college]);
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(c => c._id !== id));
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CollegeContext.Provider value={{ 
      compareList, 
      addToCompare, 
      removeFromCompare, 
      clearCompare,
      savedColleges,
      setSavedColleges
    }}>
      {children}
    </CollegeContext.Provider>
  );
};
