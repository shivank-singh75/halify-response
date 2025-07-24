declare module 'halify-response' {
  export function successResponse(
    moduleName: string,
    message: string,
    selfUrl: string,
    data?: any
  ): any;

  export function createResponse(
    moduleName: string, 
    data: any, 
    selfUrl: string
  ): any;

  export function detailResponse(
    moduleName: string, 
    data: any, 
    selfUrl: string
  ): any;

  export function updateResponse(
    moduleName: string, 
    data: any, 
    selfUrl: string
  ): any;

  export function deleteResponse(
    moduleName: string, 
    selfUrl?: string
  ): any;

  export function paginatedResponse(
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
