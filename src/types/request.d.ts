import { AxiosResponse } from 'axios';

type ResData = {
    code: number;
    data: any;
    msg: string;
}

declare interface AxiosFun {
    (url: string, param: any): Promise<AxiosResponse<ResData>>
}