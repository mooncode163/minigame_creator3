
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('FrendBoardWeiXin')
export class FrendBoardWeiXin extends CCObject {
 
    //https://www.jianshu.com/p/abf753ded43b
    //https://segmentfault.com/a/1190000015034592?utm_source=tag-newest
    SaveData (score) {
        //let score = '' + 50;
        // wx.setUserCloudStorage({
        //     KVDataList: [{ key: 'score', value: score }],
        //     success: res => {
        //         console.log(res);
        //         // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
        //         let openDataContext = wx.getOpenDataContext();
        //         openDataContext.postMessage({
        //             type: 'updateMaxScore',
        //         });
        //     }
        //     fail: res => {
        //         console.log(res);
        //     }
        // });
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
