
import { _decorator, CCObject } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;


@ccclass('FileUtil')
export class FileUtil extends CCObject {

    //除去文件后缀  并去除.
    static  GetFileBeforeExtWithOutDot(filepath: string) {
        var ret = filepath;
        var idx = filepath.lastIndexOf(".");
        if (idx >= 0) {
            ret = filepath.substr(0, idx);
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
