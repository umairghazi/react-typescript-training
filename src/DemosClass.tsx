import React from "react";
import { ColumnConfig } from "./common-types";
import DataGrid from "./DataGrid";

interface DemoClassState {
  columnConfig: ColumnConfig[];
}

export default class DemosClass extends React.Component<any, DemoClassState> {
  constructor(props: any) {
    super(props);

    this.state = {
      columnConfig: [
        {
          field: "firstName",
          label: "First Name"
        },
        {
          field: "lastName"
        }
      ]
    };
  }

  handleSelectHeader = (field: string) => {
    console.log(`You selected ${field}`);
    const nextColumnConfig = this.state.columnConfig.map(column => {
      if (column.field === field) {
        column.sortIndicator = "⬆️";
      } else {
        delete column.sortIndicator;
      }

      return column;
    });

    this.setState({ columnConfig: nextColumnConfig });
  };

  render() {
    return (
      <DataGrid
        columnConfig={this.state.columnConfig}
        data={[]}
        selectHeader={this.handleSelectHeader}
      />
    );
  }
}
