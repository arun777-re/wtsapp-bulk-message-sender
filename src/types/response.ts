
export interface ApiResponseFormat {
    success:boolean;
    status:number;
    data?:any[] | string;
    message:string;
}