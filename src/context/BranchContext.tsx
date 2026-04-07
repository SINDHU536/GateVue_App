import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BranchContext = createContext<any>(null);

export const BranchProvider = ({ children }: any) => {

  const [branch, setBranch] = useState("All");

  // 🔥 Load saved branch
  useEffect(() => {
    const loadBranch = async () => {
      const saved = await AsyncStorage.getItem("branch");
      if (saved) setBranch(saved);
    };
    loadBranch();
  }, []);

  // 🔥 Update + Save
  const updateBranch = async (newBranch: string) => {
    setBranch(newBranch);
    await AsyncStorage.setItem("branch", newBranch);
  };

  return (
    <BranchContext.Provider value={{ branch, setBranch: updateBranch }}>
      {children}
    </BranchContext.Provider>
  );
};

// 🔥 Hook
export const useBranch = () => useContext(BranchContext);