import React, { useEffect, useState } from "react";
import { Tabs } from "../../components/tabs.component";
import { getReport } from "../../services/report.service";
import InputControlled from "../../components/input.component";

const tabs = [
  "Productos mas vendidos",
  "Clientes con mayores ganancias",
  "Clientes con mas ventas",
  "Clientes con mas pedidos",
  "Clientes con mas productos",
];
const tabReportUri = [
  "product",
  "client/revenue",
  "client/sale",
  "client/delivery",
  "client/product",
];

export function Reports() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [report, setReport] = useState<object[]>([]);

  useEffect(() => {
    getReport(
      tabReportUri[selectedTab],
      startDate,
      endDate
    ).then(setReport);
  }, [selectedTab, startDate, endDate]);

  const tabsFormatted = tabs.map((tabName, index) => ({
    tabName,
    onClick: () => setSelectedTab(index),
    selected: selectedTab === index,
  }));

  return (
    <main className="bg-neutral p-4 flex flex-col justify-center">
      <Tabs tabs={tabsFormatted} />
      <div className="flex flex-wrap mx-auto my-2">
        <InputControlled
          placeholder="Inicio"
          type="date"
          value={startDate}
          setValue={setStartDate}
        />
        <InputControlled
          placeholder="Final"
          type="date"
          value={endDate}
          setValue={setEndDate}
        />
      </div>
      {report.length ? (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              {Object.keys(report[0]).map((header: string) => (
                <th key={`${header}-${selectedTab}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.map((dataRow, index) => (
              <tr key={`${selectedTab}-${index}`} className="hover">
                <td>{index + 1}</td>
                {Object.values(dataRow).map((attribute) => (
                  <td key={`${attribute}-${selectedTab}`}>{attribute ?? ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </main>
  );
}
