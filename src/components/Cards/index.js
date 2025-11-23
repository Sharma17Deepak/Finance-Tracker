import "./style.css";
import { Row, Card } from "antd";
import Button from "../Button";

const Cards = ({ showExpenseModal, showIncomeModal, income, expense, balance}) => {
  return (
    <div>
      <Row className="my-row">
        <Card variant={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{balance}</p>
          <Button text="Reset Balance" blue={true} />
        </Card>
        <Card variant={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card variant={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
          <Button text="Add Expenses" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
