export default function mapStatusHttp(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
  };
  return statusHTTPMap[status] ?? 500;
}