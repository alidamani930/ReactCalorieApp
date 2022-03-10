import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { foods, budgets } = useBudgets();
  const amount = foods.reduce((total, food) => total + food.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  return <BudgetCard amount={amount} name="Total" max={max} hideButtons />;
}