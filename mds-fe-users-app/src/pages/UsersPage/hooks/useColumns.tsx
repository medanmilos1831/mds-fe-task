import { infrastructure } from "@/infrastructure";
import { useQueryParams } from "@/providers";
import { type IUser } from "@/repositories";
import {
  AVATAR_PLACEHOLDER,
  CLIENT_QUERY_PARAMS_PARAMS,
  MODAL_NAMES,
  SORT_PARAMS_VALUES,
  SORT_VALUES,
} from "@/types";
import { Button, Image } from "antd";

const useColumns = () => {
  const { modalClient } = infrastructure;
  const { getSort, getOrder } = useQueryParams();
  const sortBy = getSort();
  const order = getOrder();
  function getSortOrder(field: string) {
    return sortBy === field
      ? order === SORT_PARAMS_VALUES.ASC
        ? SORT_VALUES.ASC
        : SORT_VALUES.DESC
      : undefined;
  }
  return [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (record: IUser["avatar"]) => {
        return (
          <Image
            src={record ?? undefined}
            width={35}
            height={35}
            fallback={AVATAR_PLACEHOLDER}
          />
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
      sortOrder: getSortOrder("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
      sortOrder: getSortOrder("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder: getSortOrder("email"),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (record: IUser["country"]) => {
        return record.name;
      },
      sorter: true,
      sortOrder: getSortOrder(CLIENT_QUERY_PARAMS_PARAMS.COUNTRY),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (record: IUser["role"]) => {
        return record.name;
      },
      sorter: true,
      sortOrder: getSortOrder(CLIENT_QUERY_PARAMS_PARAMS.ROLE),
    },
    {
      render: (record: IUser) => {
        return (
          <Button
            danger
            type="primary"
            onClick={() => {
              modalClient.openModal({
                modalName: MODAL_NAMES.REMOVE_USER,
                data: record,
              });
            }}
          >
            Remove
          </Button>
        );
      },
    },
  ];
};

export { useColumns };
