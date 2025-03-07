export interface HttpResponse<T> {
  allData: unknown;
  data: T;
  messages: string[];
  metaData: unknown;
  status: string;
}
