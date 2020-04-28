export function getData(historyData: any, goalData: any) {
  console.log(historyData, goalData);
  const data = new Array();

  const startTime = new Date(historyData[0].date).getTime();
  const endTime = new Date(goalData.date).getTime();
  const timeInterval = endTime - startTime;

  const startAmount = parseInt(historyData[0].amount);
  const endAmount = parseInt(goalData.amount);
  const amountInterval = endAmount - startAmount;

  data.push({
    time: new Date(historyData[0].date).getTime(),
    Balance: historyData[0].amount,
    Goal: parseInt(historyData[0].amount),
  });

  for (let i = 1; i < historyData.length; i++) {
    const currentTime = new Date(historyData[i].date).getTime();
    const percentage =
      Math.round(((currentTime - startTime) / timeInterval) * 100) / 100;
    const dataPoint = {
      time: new Date(historyData[i].date).getTime(),
      Balance: historyData[i].amount,
      Goal: startAmount + amountInterval * percentage,
    };
    data.push(dataPoint);
  }

  return data;
}
