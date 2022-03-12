import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./contexts/BudgetsContext";
import AddFoodModal from "./components/AddFoodModal";
import ViewFoodsModal from "./components/ViewFoodsModal";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [viewFoodsModalBudgetId, setViewFoodsModalBudgetId] = useState();
  const [addFoodModalBudgetId, setAddFoodModalBudgetId] = useState();
  const { budgets, getBudgetFoods } = useBudgets();

  function openAddFoodModal(budgetId) {
    setShowAddFoodModal(true);
    setAddFoodModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <h1 className="my-4 text-center">React.js Calorie Counter</h1>
        <Button variant="success" onClick={() => setShowAddBudgetModal(true)}>
          Add Calorie Budget
        </Button>
        <Button variant="primary mx-3" onClick={openAddFoodModal}>
          Add Food Item
        </Button>
        <div
          class="my-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetFoods(budget.id).reduce(
              (total, food) => total + food.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddFoodClick={() => openAddFoodModal(budget.id)}
                onViewFoodsClick={() =>
                  setViewFoodsModalBudgetId(budget.id)
                }
              />
            );
          })}
        </div>
        <div
          class="my-5 mx-auto"
          style={{
            width: "40rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddFoodModal
        show={showAddFoodModal}
        defaultBudgetId={addFoodModalBudgetId}
        handleClose={() => setShowAddFoodModal(false)}
      />

      <ViewFoodsModal
        budgetId={viewFoodsModalBudgetId}
        handleClose={() => setViewFoodsModalBudgetId()}
      />
    </>
  );
}

export default App;
