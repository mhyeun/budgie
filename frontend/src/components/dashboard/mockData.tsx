export function getMockHistory() {
  // smallest date difference = 7 days
  const mockHistory = [
    {
      date: "3/3/2020",
      amount: "1000",
    },
    {
      date: "3/5/2020",
      amount: "1100",
    },
    {
      date: "3/17/2020",
      amount: "1200",
    },
    {
      date: "3/24/2020",
      amount: "200",
    },
    {
      date: "3/31/2020",
      amount: "2200",
    },
    {
      date: "4/7/2020",
      amount: "3100",
    },
    {
      date: "5/8/2020",
      amount: "10000",
    },
  ];
  return mockHistory;
}

export function getMockGoal() {
  const mockGoal = {
    date: "5/10/2020",
    amount: "10000",
  };
  return mockGoal;
}
