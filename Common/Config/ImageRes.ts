
import { _decorator, Component, Node, CCObject, resources, Prefab, Vec4 } from 'cc';
import { Common } from '../Common';
import { ImageResInternal } from './ImageResInternal';
import { ConfigBase } from './ConfigBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ImageRes')
export class ImageRes extends ConfigBase {
    imageResApp: ImageResInternal = null;
    imageResAppCommon: ImageResInternal = null;
    imageResCommon: ImageResInternal = null;

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

        strDir = Common.RES_CONFIG_DATA_COMMON + "/Image";
        fileName = "ImageRes.json";
        {
            this.imageResCommon = new ImageResInternal();
            this.imageResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResCommon);
        }

    }


    GetImageBoardString(path: string) {
        var ret = "";
        if (Common.BlankString(ret)) {
            if (this.imageResCommon != null) {
                var key = this.imageResCommon.FindKeyByPath(path);
                if (!Common.BlankString(key)) {
                    ret = this.imageResCommon.GetImageBoardString(key);
                }
            }
        }


        if (Common.BlankString(ret)) {
            if (this.imageResApp != null) {
                var key = this.imageResApp.FindKeyByPath(path);
                if (!Common.BlankString(key)) {
                    ret = this.imageResApp.GetImageBoardString(key);
                }
            }
        }

        if (Common.BlankString(ret)) {
            if (this.imageResAppCommon != null) {
                var key = this.imageResAppCommon.FindKeyByPath(path);
                if (!Common.BlankString(key)) {
                    ret = this.imageResAppCommon.GetImageBoardString(key);
                }
            }
        }

        return ret;
    }

    IsHasBoard(key: string) {
        var ret = false;
        if (this.imageResApp.IsHasKey(key)) {
            ret = this.imageResApp.IsHasBoard(key);
        }
        else {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.IsHasBoard(key);
            }
            else {
                if (this.imageResCommon != null) {
                    ret = this.imageResCommon.IsHasBoard(key);
                }
            }
        }

        //old
        if (ret == false) {


            if (!ret) {
                if (this.imageResCommon != null) {
                    ret = this.imageResCommon.IsHasBoard(key);
                }
            }

        }



        return ret;
    }


    IsContainsKey(key: string) {
        var ret = false;
        if (this.imageResApp.IsHasKey(key)) {
            ret = true;
        }
        else {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.IsHasKey(key);
            }
            else {
                if (this.imageResCommon != null) {
                    ret = this.imageResCommon.IsHasKey(key);
                }
            }
        }

        //old
        if (ret == false) {


            if (!ret) {
                if (this.imageResCommon != null) {
                    ret = this.imageResCommon.IsHasKey(key);
                }
            }

        }

        return ret;
    }

    GetImage(key: string) {
        var ret = "";
        if (this.imageResApp.IsHasKey(key)) {
            ret = this.imageResApp.GetImage(key);
        }
        else {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.GetImage(key);
            }
            else {
                if (this.imageResCommon != null) {
                    ret = this.imageResCommon.GetImage(key);
                }
            }

            // if (ret == "_NO_KEY_")
            if (Common.BlankString(ret)) {

                // if (ret == "_NO_KEY_")
                if (Common.BlankString(ret)) {
                    if (this.imageResCommon != null) {
                        ret = this.imageResCommon.GetImage(key);
                    }
                }

            }
        }

        return ret;
    }



    GetImageBoard(key: string) {
        var ret = Vec4.ZERO;
        if (this.imageResApp.IsHasKey(key)) {
            ret = this.imageResApp.GetImageBoard(key);
        }
        else {

            if (this.imageResAppCommon != null) {
                if (this.imageResAppCommon.IsHasKey(key)) {
                    ret = this.imageResAppCommon.GetImageBoard(key);
                }

            }

        }


        if (ret == Vec4.ZERO) {
            if (this.imageResCommon != null) {
                if (this.imageResCommon.IsHasKey(key)) {
                    ret = this.imageResCommon.GetImageBoard(key);
                }
            }
        }

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
