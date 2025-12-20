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
    parseOpt: (response: I[]) => DefaultOptionType[];
  };
}) {
  const query = useQuery(queryConfig);
  const { parseOpt, ...rest } = selectProps;
  return (
    <AntSelect
      {...rest}
      style={{ width: "100%" }}
      loading={query.isLoading}
      options={parseOpt(query.data?.result ?? [])}
    />
  );
}

export { AntSelect, QueryAntSelect };
