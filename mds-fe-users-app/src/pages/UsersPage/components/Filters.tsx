import { Col, Row } from "antd";
import { QueryAntSelect } from "@/components";
import { infrastructure } from "@/infrastructure";
import { REACT_QUERY_KEYS } from "@/types";
import { type IRole, type ICountry } from "@/repositories";
import { useQueryParams } from "@/providers";

const Filters = () => {
  const { roleRepository, countryRepository } = infrastructure;
  const { setRole, setCountry, getRole, getCountry } = useQueryParams();

  return (
    <Row gutter={16}>
      <Col span={12}>
        <QueryAntSelect<IRole>
          queryConfig={{
            queryKey: [REACT_QUERY_KEYS.ROLES],
            queryFn: roleRepository.getRoles,
          }}
          selectProps={{
            allowClear: true,
            placeholder: "Select Role",
            value: getRole(),
            onChange: setRole,
            parseOptions: (items) => {
              return (
                items.map((role) => ({
                  value: role.name,
                  label: role.name,
                })) ?? []
              );
            },
          }}
        />
      </Col>
      <Col span={12}>
        <QueryAntSelect<ICountry>
          queryConfig={{
            queryKey: [REACT_QUERY_KEYS.COUNTRIES],
            queryFn: countryRepository.getCountries,
          }}
          selectProps={{
            allowClear: true,
            placeholder: "Select Country",
            value: getCountry(),
            onChange: setCountry,
            parseOptions: (items) => {
              return (
                items.map((role) => ({
                  value: role.name,
                  label: role.name,
                })) ?? []
              );
            },
          }}
        />
      </Col>
    </Row>
  );
};

export { Filters };
