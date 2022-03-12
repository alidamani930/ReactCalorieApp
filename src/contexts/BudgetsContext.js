import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [foods, setFoods] = useLocalStorage("foods", []);

  function getBudgetFoods(budgetId) {
    return foods.filter((food) => food.budgetId === budgetId);
  }
  function addFood({ description, amount, budgetId }) {
    setFoods((prevFoods) => {
      return [...prevFoods, { id: uuidv4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidv4(), name, max }];
    });
  }

  function deleteFood({ id }) {
    setFoods((prevFoods) => {
      return prevFoods.filter((food) => food.id !== id);
    });
  }

  function deleteBudget({ id }) {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
    foods.forEach((food) => {
      if (food.budgetId === id) deleteFood(food);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        foods,
        getBudgetFoods,
        addFood,
        addBudget,
        deleteBudget,
        deleteFood,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
