import { Button, Modal, Stack } from "react-bootstrap";
import {
  SNACK_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";


export default function ViewFoodsModal({ budgetId, handleClose }) {
  const { getBudgetFoods, budgets, deleteBudget, deleteFood } =
    useBudgets();
  const foods = getBudgetFoods(budgetId);
  const budget =
    SNACK_BUDGET_ID === budgetId
      ? { name: "Snack", id: SNACK_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>{budget?.name} Food Items</div>
            {budgetId !== SNACK_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="2">
          {foods.map((food) => (
            <Stack direction="horizontal" gap="2" key={food.id}>
              <div className="me-auto fs-4">{food.description}</div>
              <div className="me-auto fs-6">
                {food.amount} calories
              </div>
              <Button
                onClick={() => deleteFood(food)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
