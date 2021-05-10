
import { _decorator, Component, Node, Sprite, Texture2D, Vec4 } from 'cc';
import { Common } from '../../Common';
import { ImageRes } from '../../Config/ImageRes';
import { Device } from '../../Device';
import { FileUtil } from '../../File/FileUtil';
import { UIView } from '../ViewController/UIView';
import { TextureUtil } from '../../Image/TextureUtil';
import { TextureCache } from '../../Cache/TextureCache';
import { UIImage } from './UIImage';
const { ccclass, property, type } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UISprite')
export class UISprite extends UIImage {
 

    onLoad() {
        super.onLoad();
         
    }

    start() {
        // [3]
        super.start();
    }
 

    LayOut() {
        super.LayOut();
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
