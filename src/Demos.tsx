import React, { useState } from "react";
import DataGrid from "./DataGrid";
import { ColumnConfig } from "./common-types";

export default function Demos() {
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>([
    {
      field: "firstName",
      label: "First Name"
    },
    {
      field: "lastName"
    }
  ]);

  const handleSelectHeader = (field: string) => {
    console.log(`You selected ${field}`);
    const nextColumnConfig = columnConfig.map(column => {
      if (column.field === field) {
        column.sortIndicator = "⬆️";
      } else {
        delete column.sortIndicator;
      }

      return column;
    });

    setColumnConfig(nextColumnConfig);
  };

  const data = [
    {
      firstName: "John",
      lastName: "Paxton",
      id: "1"
    },
    {
      firstName: "Andreina",
      lastName: "Castillo",
      id: "2"
    },
    {
      firstName: "Elijah",
      lastName: "Snow",
      id: "3"
    }
  ];

  return (
    <DataGrid
      columnConfig={columnConfig}
      data={data}
      selectHeader={handleSelectHeader}
    />
  );
}
