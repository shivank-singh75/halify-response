declare module 'halify-response' {
  export function successResponse(
    res: any,
    message: string,
    httpCode?: number,
    data?: any
  ): any;

  export function createResponse(
    res: any,
    message: string,
    httpCode?: number,
    data?: any
  ): any;

  export function detailResponse(
    res: any,
    message: string,
    httpCode?: number,
    data?: any
  ): any;

  export function updateResponse(
    res: any,
    message: string,
    httpCode?: number,
    data?: any
  ): any;

  export function deleteResponse(
    res: any,
    message: string,
    httpCode?: number,
    data?: any
  ): any;

  export function paginatedResponse(
    res: any,
    moduleName: string,
    dataArr: any[],
    selfUrl: string,
    firstUrl: string,
    lastUrl: string,
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
  ): any;

  export function validationErrorResponse(
    errors: Array<{
      instancePath?: string;
      schemaPath?: string;
      keyword?: string;
      params: {
        missingProperty: string;
      };
      message: string;
    }>
  ): Promise<any>;

  export function customErrorResponse(
    key: string,
    message: string
  ): Promise<any>;
}
