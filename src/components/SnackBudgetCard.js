import {
  SNACK_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function SnackBudgetCard(props) {
  const { getBudgetFoods } = useBudgets();
  const amount = getBudgetFoods(SNACK_BUDGET_ID).reduce(
    (total, food) => total + food.amount,
    0
  );
  return <BudgetCard amount={amount} gray name="Snacks/Misc" {...props} />;
}
