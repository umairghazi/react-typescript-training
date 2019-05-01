import React from "react";
import { ColumnConfig } from "./common-types";
import * as _ from "lodash";
import { Payee } from "./payees/Payee";

interface HasId {
  id: string;
}

interface DataGridProps<T extends HasId> {
  columnConfig: ColumnConfig[];
  data: T[];
  selectHeader: (field: keyof Payee) => void;
}

export default function DataGrid<T extends HasId>(props: DataGridProps<T>) {
  const { data, columnConfig, selectHeader } = props;
  const fields = columnConfig.map(column => column.field);

  return (
    <table className="table table-striped">
      <DataGridHeader columnConfig={columnConfig} selectHeader={selectHeader} />
      <tbody>
        {data.map(row => (
          <DataGridRow key={row.id} row={row} fields={fields} />
        ))}
      </tbody>
    </table>
  );
}

interface DataGridHeaderProps {
  columnConfig: ColumnConfig[];
  selectHeader: (field: string) => void;
}

export const DataGridHeader = ({
  columnConfig,
  selectHeader
}: DataGridHeaderProps) => {
  return (
    <thead>
      <tr>
        {columnConfig.map(({ field, label, sortIndicator }) => (
          <th onClick={() => selectHeader(field)} key={field}>
            {label ? label : _.startCase(field)}
            {sortIndicator ? <span>{sortIndicator}</span> : ""}
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface DataGridRowProps<T> {
  fields: string[];
  row: T;
  selectRow?: (row: T) => void;
}

export function DataGridRow<T>({
  fields,
  row,
  selectRow
}: DataGridRowProps<T>) {
  return (
    <tr onClick={() => selectRow && selectRow(row)}>
      {fields.map(field => {
        return <td key={field}>{_.get(row, field)}</td>;
      })}
    </tr>
  );
}
