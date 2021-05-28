
import { _decorator, Component, Node, Prefab } from 'cc';  
import { FileSystemPlatformWrapper } from '../../../File/FileSystemPlatformWrapper';
const { ccclass, property, type } = _decorator;

@ccclass('FileSystemWeixin')
export class FileSystemWeixin extends FileSystemPlatformWrapper { 
    static _main: FileSystemWeixin;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FileSystemWeixin();
        }
        return this._main;
    }
 
    GetRootDirPath () {
        return `${wx.env.USER_DATA_PATH}/` + FileSystemPlatformWrapper.FILE_ROOT_DIR;
        // return `${wx.env.USER_DATA_PATH}`;
        return "";
    }

    DownloadFile (obj:any) {

        const fs = wx.getFileSystemManager()
        var dir = this.GetRootDirPath(); 

        const downloadTask = wx.downloadFile({
            //url: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/ShapeColor/CloudRes.zip?sign=e78a71df50918d8ee0e181886b20c12f&t=1555465442",
            url: obj.url,
            success (res) {
                var filePath = res.tempFilePath;
                console.log("downloadFile=" + filePath)
                // this.UnzipFile(filePath);
                if (obj.success != null) {
                    obj.success(res);
                }
            },

            fail (res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }

        })
        downloadTask.onProgressUpdate((res) => {
           
            if (obj.progress != null) {
                obj.progress(res);
            }
        })

        // downloadTask.abort() // 取消下载任务

    }

    UnzipFile (obj:any) {
        const fs = wx.getFileSystemManager();
        var dir = this.GetRootDirPath();
        fs.unzip({
            zipFilePath: obj.zipFilePath,
            targetPath: obj.targetPath,
            success (res) {
                console.log("weixin unzip success=" + dir);
                // this.readFile(dir + "/CloudRes/image/Bird/Albatross.png");
                if (obj.success != null) {
                    obj.success(res);
                }
            },
            fail (res) {
                console.log("weixin unzip fail");
                if (obj.fail != null) {
                    obj.fail(res);
                }
            },

        });
    }

    ReadFile (obj:any) {
        const fs = wx.getFileSystemManager()
        var dir = this.GetRootDirPath();
        fs.readFile({
            filePath: obj.filePath,
            success (res) {
                if (obj.success != null) {
                    obj.success(res);
                }
            },
            fail (res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            },

        })
    }
    WriteFile (obj:any) {
        const fs = wx.getFileSystemManager()
        fs.writeFile({
            filePath: obj.filePath,
            success (res) {
                if (obj.success != null) {
                    obj.success(res);
                }
            },
            fail (res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            },

        })
    }

    DeleteFile (filepath:string) {
        const fs = wx.getFileSystemManager()
        fs.removeSavedFile({
            filePath: filepath,
            success (res) {

            },
            fail (res) {

            },

        })
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
