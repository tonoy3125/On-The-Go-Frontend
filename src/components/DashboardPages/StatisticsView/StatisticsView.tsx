import DailyTransactions from "../DailyTransactions/DailyTransactions";
import PaymentStatistics from "../PaymentStatistics/PaymentStatistics";
import StatisticsHeading from "../StatisticsHeading/StatisticsHeading";
import UserStatisticsPieChart from "../UserStatisticsPieChart/UserStatisticsPieChart";

const StatisticsView = () => {
  return (
    <div className="w-full">
      <StatisticsHeading />
      <DailyTransactions />
      <div className="flex items-start flex-col xl:flex-row gap-[20px] my-[20px]">
        <div className="flex flex-col gap-[20px] w-full">
          <UserStatisticsPieChart />
          {/* <UserStatistics /> */}
        </div>
        {/* <TopUsersTable /> */}
      </div>
      <PaymentStatistics />
    </div>
  );
};

export default StatisticsView;
