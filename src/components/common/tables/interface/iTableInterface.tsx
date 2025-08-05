interface iTableGridProps {
  data: any[];
  dataColumns: string[];
  primaryKey: string;
  tableHeaders: string[];
  groupBy: string;
  dataType: "sum" | "count";
}
