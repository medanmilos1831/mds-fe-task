import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { Select, type SelectProps } from "antd";
import { type DefaultOptionType } from "antd/es/select";

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
  const { parseOptions, ...rest } = selectProps;
  return (
    <AntSelect
      {...rest}
      style={{ width: "100%" }}
      loading={query.isLoading}
      options={parseOptions(query.data?.result ?? [])}
    />
  );
}

export { AntSelect, QueryAntSelect };
