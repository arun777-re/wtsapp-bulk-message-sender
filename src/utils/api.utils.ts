import { ROUTES } from '@/constant/route'
import { ApiResponseFormat } from '@/types/response'
import axios from 'axios'

export class APIRequestFetch {
    async postRequest({data,url}:{data?:FormData | Record<string,any>,url:string}):Promise<ApiResponseFormat>{
        const result = await axios.post(url,data,{
            headers:{"Content-Type":"application/json"}
        }) 
        const res = await result.data;
        return res;
    }
    async getRequest(url:string):Promise<ApiResponseFormat>{
        const result = await axios.get(url) 
        const res = await result.data;
        return res;
    }

}