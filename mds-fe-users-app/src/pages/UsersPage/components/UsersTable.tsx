import { useQuery } from "@tanstack/react-query";
import type { TableProps } from "antd/es/table";

import { infrastructure } from "@/infrastructure";
import { useQueryParams } from "@/providers";
import { REACT_QUERY_KEYS } from "@/types";
import { Pagination, Row, Col } from "antd";
import { UserCardList } from "./UserCardList";
import { AntTable } from "@/components";

const UsersTable = ({ columns }: { columns: TableProps["columns"] }) => {
  const { userRepository } = infrastructure;
  const { setPagination, getSearchParams, setSort } = useQueryParams();
  const params = getSearchParams();
  const { data: response, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.USERS, params],
    queryFn: () => userRepository.getUsers(params),
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination(page, pageSize);
  };

  return (
    <>
      <div className="mobile-view">
        <UserCardList users={response?.result ?? []} loading={isLoading} />
        {response && (
          <Row justify="center" style={{ marginTop: 24 }}>
            <Col>
              <Pagination
                current={response.page}
                pageSize={response.pageSize}
                total={response.total}
                onChange={handlePaginationChange}
                onShowSizeChange={handlePaginationChange}
                pageSizeOptions={["10", "25", "50"]}
                showSizeChanger
              />
            </Col>
          </Row>
        )}
      </div>

      <div className="desktop-view">
        <AntTable
          rowKey="id"
          dataSource={response?.result ?? []}
          loading={isLoading ?? false}
          columns={columns}
          onChange={(_, __, sorter: any) => {
            setSort(sorter.field ?? null, sorter.order ?? null);
          }}
          pagination={{
            pageSize: response?.pageSize,
            current: response?.page,
            total: response?.total,
            onChange: setPagination,
            pageSizeOptions: [10, 25, 50],
            showSizeChanger: true,
          }}
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
};

export { UsersTable };
