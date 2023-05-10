import React, { useRef, useState } from "react";
import { Tabs } from "../../components/tabs.component";
import InsertEmployee from "./employee/insert.route";
import UpdateEmployee from "./employee/update.route";

export default function Employees() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    {
      onClick: () => setSelected(0),
      selected: selected === 0,
      tabName: "Añadir",
    },
    {
      onClick: () => setSelected(1),
      selected: selected === 1,
      tabName: "Modificar",
    },
  ];

  return (
    <>
      <Tabs tabs={tabs} />
      {selected === 0 ? <InsertEmployee /> : <UpdateEmployee />}
    </>
  );
}
