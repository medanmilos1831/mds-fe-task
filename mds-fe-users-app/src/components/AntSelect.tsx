import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

function AntSelect(props: SelectProps) {
  return <Select {...props} />;
}

function QueryAntSelect<I>({
  queryConfig,
  selectProps,
}: {
  queryConfig: UndefinedInitialDataOptions<any>;
  selectProps: Omit<SelectProps, "style" | "options" | "loading"> & {
    parseOptions: (response: I[]) => DefaultOptionType[];
  };
}) {
  const query = useQuery(queryConfig);
  return (
    <AntSelect
      {...selectProps}
      style={{ width: "100%" }}
      loading={query.isLoading}
      options={selectProps.parseOptions(query.data?.result ?? [])}
    />
  );
}

export { AntSelect, QueryAntSelect };
