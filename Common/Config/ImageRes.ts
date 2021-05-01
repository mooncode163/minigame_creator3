
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Common } from '../Common';
import { ImageResInternal } from './ImageResInternal';
import { ConfigBase } from './ConfigBase';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ImageRes')
export class ImageRes extends ConfigBase {
    imageResApp: ImageResInternal = null;

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

        var strDir = Common.RES_CONFIG_DATA + "Image";
        var fileName = "imageResApp.json";
        { 
            this.imageResApp = new ImageResInternal();
            this.imageResApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResApp);
        }
   

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
