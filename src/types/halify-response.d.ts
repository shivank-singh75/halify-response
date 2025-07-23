declare module 'halify-response' {
    export function successResponse(
      res: any,
      message: string,
      httpCode?: number,
      dataArr?: any
    ): any;
  
    export function errorResponse(
      res: any,
      message: string,
      httpCode?: number,
      errorArr?: any
    ): any;
  
    export function dataList(
      moduleName: string,
      dataArr: any[],
      selfUrl: string,
      firstUrl: string,
      lastUrl: string,
      page: number,
      pageCount: number,
      pageSize: number,
      total: number
    ): Promise<any>;
  
    export function dataDetails(
      moduleName: string,
      dataArr: any,
      selfUrl: string
    ): Promise<any>;
  
    export function customError(key: string, message: string): Promise<any>;
  
    export function validationError(errors: any[]): Promise<any>;
}
  