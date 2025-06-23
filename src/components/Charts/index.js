import { Line, Pie } from "@ant-design/charts";
import "./style.css";

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpendings = spendingData.reduce((acc,obj) => {
    let key=obj.tag;
    if(!acc[key]) {
        acc[key] = { tag: obj.tag, amount:obj.amount }; //Create a new object with same properties
    } else {
        acc[key].amount +=obj.amount;
    }
    return acc;
  },{});

  const config = {
    data: data,
    width: 500,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div className="charts-wrapper">
      <div>
        <h2 style={{ marginTop: 0, marginBottom: "2rem" }}>
          Financial Statistics
        </h2>
        <Line {...config} />
      </div>
      <div>
        <h2>Total Spending </h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
};

export default ChartComponent;
