const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

type List = Array<{cover:string;bgcolor:string;}>

const getImgColor = (list:List):Promise<List> => {
    if (!list || !list.length) {
        return Promise.resolve([]);
    }
    let width = 0;
    let height = 0;
    let i = list.length;
    
    return new Promise(resolve => {
        list.forEach(l => {
            if(!l.cover){
                l.bgcolor='#555';
            } else {
                const img = new Image();
                img.crossOrigin = "";
                img.src = l.cover;
                img.onload = function() {
                    i--;
                    width = canvas.width = Math.floor(img.width / 2);
                    height = canvas.height = Math.floor(img.height / 2);
                    ctx.drawImage(img, 0, 0, width, height);
                    const data = ctx.getImageData(0, 0, width, height).data;
                    let r = 1, g = 1, b = 1;
                    // 取所有像素的平均值
                    for (let row = 0; row < height; row++) {
                        for (let col = 0; col < width; col++) {
                            if (row == 0) {
                                r += data[width * row + col];
                                g += data[width * row + col + 1];
                                b += data[width * row + col + 2];
                            } else {
                                r += data[(width * row + col) * 4];
                                g += data[(width * row + col) * 4 + 1];
                                b += data[(width * row + col) * 4 + 2];
                            }
                        }
                    }
    
                    // 求取平均值
                    r /= width * height;
                    g /= width * height;
                    b /= width * height;
    
                    // 将最终的值取整
                    r = Math.round(r);
                    g = Math.round(g);
                    b = Math.round(b);
                    l.bgcolor = `rgb(${r},${g},${b})`;
                    if (i <= 0) {
                        resolve(list);
                    }
                }
            }
        });
    });
};

export default getImgColor;
