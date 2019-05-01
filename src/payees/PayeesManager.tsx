import React, { Component } from "react";
import {
  axiosService as dao,
  PayeeSortCriteria,
  PayeeCriteria,
  SortOrder
} from "./payees-service";
import { Payee } from "./Payee";
import DataGrid from "../DataGrid";
import { ColumnConfig } from "../common-types";

interface PayeesManagerState {
  sortCriteria?: PayeeSortCriteria;
  searchCriteria?: PayeeCriteria;
  payees: Payee[];
  columnConfig: ColumnConfig[];
}

class PayeesManager extends Component<any, PayeesManagerState> {
  constructor(props: any) {
    super(props);
    const columnConfig: ColumnConfig[] = [
      {
        field: "payeeName"
      },
      {
        field: "address,city",
        label: "City"
      },
      {
        field: "address,state",
        label: "State"
      }
    ];

    this.state = {
      payees: [],
      columnConfig
    };
  }

  componentDidMount() {
    dao.getPayees().then(payees => {
      if (payees) this.setState({ payees });
    });
  }

  handleSelectHeader(field: keyof Payee) {
    let sortField = "",
      order: SortOrder = "asc";
    if (this.state.sortCriteria) {
      sortField = this.state.sortCriteria.field;
      order = this.state.sortCriteria.order;
    }
    if (field === sortField && order === "asc") {
      order = "desc";
    } else {
      order = "asc";
    }

    this.setState({
      sortCriteria: {
        field,
        order
      }
    });
  }

  render() {
    console.log(this);
    return (
      <section>
        <h2>Payees</h2>
        <DataGrid
          columnConfig={this.state.columnConfig}
          data={this.state.payees}
          selectHeader={this.handleSelectHeader}
        />
      </section>
    );
  }
}

export default PayeesManager;
