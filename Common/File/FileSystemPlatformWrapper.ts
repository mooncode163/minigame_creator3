
import { _decorator, Component, Node, Prefab, CCObject } from 'cc';  
const { ccclass, property, type } = _decorator;

@ccclass('FileSystemPlatformWrapper')
export class FileSystemPlatformWrapper extends CCObject { 
    public static FILE_ROOT_DIR = "moonma";

    static _main: FileSystemPlatformWrapper;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FileSystemPlatformWrapper();
        }
        return this._main;
    }

 

    GetRootDirPath () {
        return "";
    }

    ReadFile (obj) {
    }
    WriteFile (obj) {
    }
    UnzipFile (obj) {
   
    }
    DownloadFile (obj) {
    }
    DeleteFile (filepath) { 
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
