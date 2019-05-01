import React from "react";
import { shallow } from "enzyme";
import DataGrid, { DataGridHeader, DataGridRow } from "./DataGrid";
import { ColumnConfig } from "./common-types";

it("description", () => {
  expect("Blah").not.toBe(4);
});

it("should render a DataGrid", () => {
  const columnConfig: any = [
    {
      field: "firstName",
      label: "First Name"
    },
    {
      field: "lastName"
    }
  ];

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

  const handleSelectHeader = () => null;

  const wrapper = shallow(
    <DataGrid
      data={data}
      selectHeader={handleSelectHeader}
      columnConfig={columnConfig}
    />
  );

  const gridRows = wrapper.find("DataGridRow");
  expect(gridRows.length).toBe(data.length);
});

describe("DataGrid", () => {
  let data: any[], columnConfig: ColumnConfig[], selectHeader: jest.Mock;
  beforeEach(() => {
    data = [
      {
        firstName: "John",
        lastName: "Paxton",
        active: true,
        id: "1"
      },
      {
        firstName: "Andreina",
        lastName: "Castillo",
        active: false,
        id: "2"
      },
      {
        firstName: "Elijah",
        lastName: "Snow",
        active: false,
        id: "3"
      }
    ];
    columnConfig = [
      {
        field: "firstName",
        label: "First Name"
      },
      {
        field: "lastName"
      }
    ];
    selectHeader = jest.fn();
  });

  it("should render a DataGrid", () => {
    const wrapper = shallow(
      <DataGrid
        data={data}
        selectHeader={selectHeader}
        columnConfig={columnConfig}
      />
    );
    const gridRows = wrapper.find("DataGridRow");
    expect(gridRows.length).toBe(data.length);
  });

  it("should render a non empty value for each cell", () => {
    const row = data[0];
    const columns = columnConfig.map(column => column.field);
    const wrapper = shallow(<DataGridRow row={row} fields={columns} />);
    const tds = wrapper.find("td");
    tds.forEach((td, index) =>
      expect(td.text()).toEqual(String(row[columns[index]]))
    );
  });

  it("should fire selectHeader on DataGridHeader", () => {
    const wrapper = shallow(
      <DataGridHeader columnConfig={columnConfig} selectHeader={selectHeader} />
    );

    expect(selectHeader).not.toHaveBeenCalled();
    wrapper.find("th:first-child").simulate("click");
    expect(selectHeader).toHaveBeenCalled();
    expect(selectHeader.mock.calls[0][0]).toBe(columnConfig[0].field);
    expect(selectHeader).toHaveBeenCalledWith(columnConfig[0].field);
  });
});
