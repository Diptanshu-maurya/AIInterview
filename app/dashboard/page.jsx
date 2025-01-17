import React from "react";
import AddNewInterview from "../Components/AddNewInterview";
import PreviousInterview from "../Components/PreviousInterview";

function Dashboard() {
  return (
    <div>
      <h1 className=" font-bold text-2xl p-5">
        Start your new mock Interview :
      </h1>
      <AddNewInterview></AddNewInterview>

     
      <PreviousInterview></PreviousInterview>
    </div>
  );
}

export default Dashboard;
