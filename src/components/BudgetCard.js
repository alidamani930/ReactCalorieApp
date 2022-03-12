import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";


export default function BudgetCard({
  name,
  amount,
  max,
  hideButtons,
  onAddFoodClick,
  onViewFoodsClick,
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } 
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {amount}{" calories "}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {max} calories
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="primary"
              className="ms-auto"
              onClick={onAddFoodClick}
            >
              Add Food Item
            </Button>
            <Button variant="info" onClick={onViewFoodsClick}>
              View Food Items
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.8) {
    return "success";
  } else if (ratio < 0.9) {
    return "warning";
  } else {
    return "danger";
  }
}
