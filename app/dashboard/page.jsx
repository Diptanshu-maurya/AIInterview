import React from "react";
import AddNewInterview from "../Components/AddNewInterview";
import PreviousInterview from "../Components/PreviousInterview";

function Dashboard() {
  return (
    <div className="bg-zinc-200">
      <h1 className=" font-bold text-2xl p-5 bg-zinc-400">
        Start your new mock Interview :
      </h1>
      <AddNewInterview></AddNewInterview>

     
      <PreviousInterview></PreviousInterview>
    </div>
  );
}

export default Dashboard;
