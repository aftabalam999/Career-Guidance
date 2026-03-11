import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const CollegeContext = createContext();

export const useColleges = () => useContext(CollegeContext);

export const CollegeProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [savedColleges, setSavedColleges] = useState([]);
  const { showToast } = useToast();

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
      showToast("You can compare up to 3 colleges at a time.", "warning");
      return;
    }
    if (compareList.find(c => c._id === college._id)) {
      showToast("College already in comparison list.", "info");
      return;
    }
    setCompareList([...compareList, college]);
    showToast(`${college.name} added to comparison list!`, "success");
  };

  const removeFromCompare = (id) => {
    const collegeToRemove = compareList.find(c => c._id === id);
    setCompareList(compareList.filter(c => c._id !== id));
    if (collegeToRemove) {
      showToast(`${collegeToRemove.name} removed from comparison list.`, "info");
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast("Comparison list cleared.", "info");
  };

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
