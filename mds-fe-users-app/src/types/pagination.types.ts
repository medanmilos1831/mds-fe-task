export interface IResponseWithPagination<D = any> {
  result: D[];
  page: number;
  pageSize: number;
  total: number;
}

export interface IResponse<D = any> {
  result: D;
}
