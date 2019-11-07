import * as qiniu from "qiniu-js";
import { get } from "./request";

const domain = "http://p51zxaow1.bkt.clouddn.com";
const config = {
    useCdnDomain: true,
    region: qiniu.region.z0
};
const putExtra = {
    fname: "",
    params: {},
    mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif" ,"video/mp4"]
};
const upload = (e, opt, callback, progress) => {
    const file = e.target.files[0];
    opt.type = opt.type || 'image';
    if (!file) {
        callback({ code: -1, message: "file not exist" });
        return false;
    }

    if (opt.type == 'image' &&  ["image/png", "image/jpeg", "image/jpg", "image/gif"].indexOf(file.type) === -1) {
        callback({ code: -1, message: "请上传正确格式的图片" });
        return false;
    }

    if(opt.type == 'video' && ['video/mp4'].indexOf(file.type) === -1){
        callback({ code: -1, message: "请上传mp4格式的视频" });
        return false;
    }

    const size = opt.size || 6;
    const fileSize = Math.floor(file.size / 1024);
    if (fileSize > 1024 * size) {
        callback({ code: -1, message: "上传大小不能超过" + size + "M" });
        return false;
    }

    get("/tools/getToken").then(res => {
        if (!res.data.uptoken) {
            callback({ code: -1, data: res.data, message: "获取token失败" });
            return false;
        }

        const observable = qiniu.upload( file, '' + new Date().getTime(), res.data.uptoken, null, config ); //key设置为 null/undefined, 则文件名会以 hash 值作为资源名
        observable.subscribe(
            ret => {
                if(!progress) return;
                progress(Math.floor(ret.total.percent));
            },
            callback,
            callback
        );
    }, err => {
        callback(err);
    });
};