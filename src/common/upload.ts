// import * as qiniu from "qiniu-js";
// import { get } from "./request";

// // const domain = "http://p51zxaow1.bkt.clouddn.com";
// // const putExtra = {
// //     fname: "",
// //     params: {},
// //     mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif" ,"video/mp4"]
// // };
// const config = {
//     useCdnDomain: true,
//     region: qiniu.region.z0
// };

// const upload = (e, opt, callback, progress) => {
//     const file = e.target.files[0];
//     opt.type = opt.type || 'image';
//     if (!file) {
//         callback({ code: -1, message: "file not exist" });
//         return false;
//     }

//     if (opt.type == 'image' &&  ["image/png", "image/jpeg", "image/jpg", "image/gif"].indexOf(file.type) === -1) {
//         callback({ code: -1, message: "请上传正确格式的图片" });
//         return false;
//     }

//     if(opt.type == 'video' && ['video/mp4'].indexOf(file.type) === -1){
//         callback({ code: -1, message: "请上传mp4格式的视频" });
//         return false;
//     }

//     const size = opt.size || 6;
//     const fileSize = Math.floor(file.size / 1024);
//     if (fileSize > 1024 * size) {
//         callback({ code: -1, message: "上传大小不能超过" + size + "M" });
//         return false;
//     }

//     get("/tools/getToken").then(res => {
//         if (!res.data.uptoken) {
//             callback({ code: -1, data: res.data, message: "获取token失败" });
//             return false;
//         }

//         const observable = qiniu.upload( file, new Date().getTime() + '' + Math.floor(Math.random()*10000), res.data.uptoken, null, config ); //key设置为 null/undefined, 则文件名会以 hash 值作为资源名
//         observable.subscribe(
//             ret => {
//                 if(!progress) return;
//                 progress(Math.floor(ret.total.percent));
//             },
//             callback,
//             callback
//         );
//     }, err => {
//         callback(err);
//     });
// };

// export default upload;


// import { compressPictureToBlob } from './util'
// import { uploadImg, uploadFiles } from '@/service'
// import { FileEvent } from '@/type';

// const uploadPic: (e: FileEvent, opt?: { size?: number, wh?: number }) => Promise<{ code: number, msg?: string; data?: string; }> = (e, opt) => {
//     const file = e.target.files[0];
//     return new Promise((resolve, reject) => {
//         if (!file) {
//             return resolve({ code: -98, msg: 'file not exist' });
//         }
//         if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.type) === -1) {
//             return resolve({ code: -98, msg: '请上传正确格式的图片' });
//         }

//         const size = opt ? opt.size : 4;
//         const fileSize = Math.floor(file.size / 1024);
//         if (fileSize > 1024 * size) {
//             return resolve({ code: -98, msg: `上传大小不能超过${size}M` });
//         }
//         const url = URL.createObjectURL(file);
//         const img = new Image();
//         img.src = url;
//         img.onload = () => {
//             URL.revokeObjectURL(url);
//             const w = opt ? opt.wh : 400;
//             compressPictureToBlob(img, w).then(blob => {
//                 if (!blob) {
//                     return resolve({ code: -98, msg: 'compress error' });
//                 }
//                 const formData = new FormData();
//                 formData.append('img', new File([blob], file.name));
//                 uploadImg(formData).then(res => {
//                     if (res.code == 1 && res.data) {
//                         resolve({ code: 1, data: res.data.imgPath });
//                     } else {
//                         resolve({ code: -98, msg: res.msg || '上传图片失败' });
//                     }
//                 });
//             });
//         };
//         img.onerror = reject;
//     });
// }

// const uploadFile: (e: FileEvent, opt?: { size?: number }) => Promise<{ code: number, msg?: string; data?: string; name?:string }> = (e, opt) => {
//     const file = e.target.files[0];
//     return new Promise((resolve) => {
//         if (!file) {
//             return resolve({ code: -98, msg: 'file not exist' });
//         }
//         const size = opt ? opt.size : 4;
//         const fileSize = Math.floor(file.size / 1024);
//         if (fileSize > size) {
//             return resolve({ code: -98, msg: `上传大小不能超过${size}M` });
//         }
//         const formData = new FormData();
//         formData.append('file', file);
//         uploadFiles(formData).then(res => {
//             if (res.code == 1 && res.data) {
//                 resolve({ code: 1, data: res.data.filePath, name:file.name });
//             } else {
//                 resolve({ code: -98, msg: res.msg || '上传文件失败' });
//             }
//         });
//     });
// }

// export {
//     uploadPic,
//     uploadFile
// } 