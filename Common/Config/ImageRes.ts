
import { _decorator, Component, Node, CCObject, resources, Prefab, Vec4 } from 'cc';
import { Common } from '../Common';
import { ImageResInternal } from './ImageResInternal';
import { ConfigBase } from './ConfigBase';
import { Platform } from '../Platform';
import { CloudRes } from '../CloundRes/CloudRes';
import { Debug } from '../Debug';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ImageRes')
export class ImageRes extends ConfigBase {
    imageResApp: ImageResInternal = null;
    imageResAppCommon: ImageResInternal = null;
    imageResCommon: ImageResInternal = null;
    imageResCloudRes: ImageResInternal = null;




    static _main: ImageRes;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ImageRes();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/Image";
        var fileName = "ImageResApp.json";
        {
            this.imageResApp = new ImageResInternal();
            this.imageResApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResApp);
        }

        strDir = Common.RES_CONFIG_DATA + "/Image";
        fileName = "ImageResAppCommon.json";
        {
            this.imageResAppCommon = new ImageResInternal();
            this.imageResAppCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResAppCommon);
        }

        // strDir = Common.RES_CONFIG_DATA_COMMON + "/Image";
        strDir = "/Common/UI"  
        fileName = "ImageRes.json";
        {
            this.imageResCommon = new ImageResInternal();
            this.imageResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResCommon);
        }


        if (!Platform.isCloudRes) {

            strDir = Common.CLOUD_RES_DIR;
            fileName = "ImageResCloudRes.json";
            {
                this.imageResCloudRes = new ImageResInternal();
                this.imageResCloudRes.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.imageResCloudRes);
            }

        }

    }

    /*
     { 
       success: (p:any) => {
           
       }, 
       fail: (p:any) => {
           
       },
     }
     */
    LoadCloudConfig(obj: any) {
        if (Platform.isCloudRes) {
            var strDir = CloudRes.main.rootPath;
            var fileName = "ImageResCloudRes.json";
            {
                this.imageResCloudRes = new ImageResInternal();
                this.imageResCloudRes.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.imageResCloudRes);
                Debug.Log("ImageRes imageResCloudRes.fileJson=" + this.imageResCloudRes.fileJson);
                this.imageResCloudRes.Load(
                    {
                        isCloud: true,
                        success: (p: any) => {
                            // this.OnFinish(obj,false);
                            Debug.Log("ImageRes imageResCloudRes success=");
                            if (obj.success != null) {
                                obj.success(this);
                            }
                        },
                        fail: () => {
                            // this.OnFinish(obj,true);
                            Debug.Log("ImageRes imageResCloudRes fail=");
                            if (obj.fail != null) {
                                obj.fail(this);
                            }
                        },
                    });
            }

        } else {
            if (obj.success != null) {
                obj.success(this);
            }
        }
    }

    GetImageBoardString(path: string) {

        var ret = "";
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    var key = p.FindKeyByPath(path);
                    if (!Common.BlankString(key)) {
                        ret = p.GetImageBoardString(key);
                    }
                }
            } else {
                return ret;
            }

        });


        // if (Common.BlankString(ret)) {
        //     if (this.imageResCommon != null) {
        //         var key = this.imageResCommon.FindKeyByPath(path);
        //         if (!Common.BlankString(key)) {
        //             ret = this.imageResCommon.GetImageBoardString(key);
        //         }
        //     }
        // }


        // if (Common.BlankString(ret)) {
        //     if (this.imageResApp != null) {
        //         var key = this.imageResApp.FindKeyByPath(path);
        //         if (!Common.BlankString(key)) {
        //             ret = this.imageResApp.GetImageBoardString(key);
        //         }
        //     }
        // }

        // if (Common.BlankString(ret)) {
        //     if (this.imageResAppCommon != null) {
        //         var key = this.imageResAppCommon.FindKeyByPath(path);
        //         if (!Common.BlankString(key)) {
        //             ret = this.imageResAppCommon.GetImageBoardString(key);
        //         }
        //     }
        // }
        // if (Common.BlankString(ret)) {
        //     if (this.imageResCloudRes != null) {
        //         var key = this.imageResCloudRes.FindKeyByPath(path);
        //         if (!Common.BlankString(key)) {
        //             ret = this.imageResCloudRes.GetImageBoardString(key);
        //         }
        //     }
        // }
        return ret;
    }

    IsHasBoard(key: string) {
        var ret = false;
        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasBoard(key);
                }
            } else {
                return ret;
            }
        });

        // if (this.imageResApp.IsHasKey(key)) {
        //     ret = this.imageResApp.IsHasBoard(key);
        // }
        // else {
        //     if (this.imageResAppCommon != null) {
        //         ret = this.imageResAppCommon.IsHasBoard(key);
        //     }
        //     else {
        //         if (this.imageResCommon != null) {
        //             ret = this.imageResCommon.IsHasBoard(key);
        //         }
        //     }
        // }

        // //old
        // if (ret == false) {


        //     if (!ret) {
        //         if (this.imageResCommon != null) {
        //             ret = this.imageResCommon.IsHasBoard(key);
        //         }
        //     }

        // }


        // if (ret == false) {
        //     if (this.imageResCloudRes != null) {
        //         ret = this.imageResCloudRes.IsHasBoard(key);
        //     }
        // }


        return ret;
    }


    IsContainsKey(key: string) {
        var ret = false;
        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasKey(key);
                }
            } else {
                return ret;
            }
        });

        // if (this.imageResApp.IsHasKey(key)) {
        //     ret = true;
        // }
        // else {
        //     if (this.imageResAppCommon != null) {
        //         ret = this.imageResAppCommon.IsHasKey(key);
        //     }
        //     else {
        //         if (this.imageResCommon != null) {
        //             ret = this.imageResCommon.IsHasKey(key);
        //         }
        //     }
        // }

        // //old
        // if (ret == false) {


        //     if (!ret) {
        //         if (this.imageResCommon != null) {
        //             ret = this.imageResCommon.IsHasKey(key);
        //         }
        //     }

        // }

        // if (ret == false) {
        //     if (this.imageResCloudRes != null) {
        //         ret = this.imageResCloudRes.IsHasKey(key);
        //     }
        // }
        return ret;
    }

    GetImage(key: string) {
        var ret = "";

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    ret = p.GetImage(key);
                    if (p == this.imageResCloudRes) {
                        if (Platform.isCloudRes) {
                            // 从CloudRes缓存目录读取
                            ret = CloudRes.main.rootPath+"/" + ret;
                        }else{
                            // 在resoureces目录
                            ret = Common.CLOUD_RES_DIR + "/" + ret;
                        }
                    }

                }
            } else {
                return;
            }
        });

        // if (this.imageResApp.IsHasKey(key)) {
        //     ret = this.imageResApp.GetImage(key);
        // }
        // else {
        //     if (this.imageResAppCommon != null) {
        //         ret = this.imageResAppCommon.GetImage(key);
        //     }
        //     else {
        //         if (this.imageResCommon != null) {
        //             ret = this.imageResCommon.GetImage(key);
        //         }
        //     }

        //     // if (ret == "_NO_KEY_")
        //     if (Common.BlankString(ret)) {

        //         // if (ret == "_NO_KEY_")
        //         if (Common.BlankString(ret)) {
        //             if (this.imageResCommon != null) {
        //                 ret = this.imageResCommon.GetImage(key);
        //             }
        //         }

        //     }
        // }

        // if (Common.BlankString(ret)) {
        //     if (this.imageResCloudRes != null) {
        //         ret = this.imageResCloudRes.GetImage(key);
        //         if (!Platform.isCloudRes) {
        //             ret = Common.CLOUD_RES_DIR + "/" + ret;
        //         }

        //     }
        // }


        return ret;
    }



    GetImageBoard(key: string) {
        var ret = Vec4.ZERO;

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            // Debug.Log("GetImageBoard ScoreBg 0 ret="+ret);
            if ((ret.x == 0)&&(ret.y == 0)&&(ret.z == 0)&&(ret.w == 0)) {
                if (p != null) {
                    ret = p.GetImageBoard(key);
                    // Debug.Log("GetImageBoard ScoreBg 2 ret="+ret);
                }
            } else {
                // Debug.Log("GetImageBoard ScoreBg 1 ret="+ret);
                return;
            }
        });

        // ScoreBg
        // ret = this.imageResCloudRes.GetImageBoard("ScoreBg");
        // Debug.Log("ScoreBg ret="+ret+ " key="+key);
        // if (this.imageResApp.IsHasKey(key)) {
        //     ret = this.imageResApp.GetImageBoard(key);
        // }
        // else {

        //     if (this.imageResAppCommon != null) {
        //         if (this.imageResAppCommon.IsHasKey(key)) {
        //             ret = this.imageResAppCommon.GetImageBoard(key);
        //         }

        //     }

        // }


        // if (ret == Vec4.ZERO) {
        //     if (this.imageResCommon != null) {
        //         if (this.imageResCommon.IsHasKey(key)) {
        //             ret = this.imageResCommon.GetImageBoard(key);
        //         }
        //     }
        // }

        return ret;
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
