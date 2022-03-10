import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SnackBudgetCard from "../components/SnackBudgetCard";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const SNACK_BUDGET_ID = "Snacks";

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
  function deleteBudget({ id }) {
    setFoods((prevFoods) => {
      return prevFoods.map((food) => {
        if (food.budgetId !== id) return food;
        return { ...food, budgetId: SNACK_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteFood({ id }) {
    setFoods((prevFoods) => {
      return prevFoods.filter((food) => food.id !== id);
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
