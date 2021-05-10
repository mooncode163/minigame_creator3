
import { _decorator, Component, Node, Prefab, CCObject, Enum } from 'cc';
import { LevelManager } from '../../../AppBase/Game/LevelManager';
import { Common } from '../../../Common/Common';
import { Debug } from '../../../Common/Debug';
const { ccclass, property, type } = _decorator;


enum GameStatus {
    //区分大小写
    Play = 0,
    Prop,

}
//必须Enum设置才能在编辑器里设置enum的值
Enum(GameStatus);

@ccclass('GameData')
export class GameData extends CCObject {

    public static GameStatus = GameStatus;
    public static NameDeadLine: string = "DeadLine";
    public static NameBoardLine: string = "BoardLine";
    public static Place_Custom: string = "Custom";

    public static MaxSpeed = 10.0;
    public static MaxBounce = 1.0;
    public static MaxRotation = 360.0;
    public static ShaderCircle:string = "Moonma/ImageCircle";
    
    public isGameFail = false;

    status = GameStatus.Play;
    radiusCustom = 0.4;
    score = 0;

    static _main: GameData;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameData();
        }
        return this._main;
    }

    //get 的用法
    get speed() {
        var ret = 0;
        var key = "KEY_GAME_SPEED";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set speed(value) {
        var key = "KEY_GAME_SPEED";
        Common.SetItemOfKey(key, value);
    }

    //get 的用法
    get rotation() {
        var ret = 0;
        var key = "KEY_GAME_ROTATION";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set rotation(value) {
        var key = "KEY_GAME_ROTATION";
        Common.SetItemOfKey(key, value);
    }


    //get 的用法
    get bounce() {
        var ret = 0;
        var key = "KEY_GAME_BOUNCE";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set bounce(value) {
        var key = "KEY_GAME_BOUNCE";
        Common.SetItemOfKey(key, value);
    }

    //  自定义目录
    get CustomImageRootDir() {
        //     string ret = Application.temporaryCachePath + "/CustomImage";
        // FileUtil.CreateDir(ret);
        // return ret;
        return "";
    }



    get HasCustomImage() {
        var ret = 0;
        var key = "KEY_HasCustomImage";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set HasCustomImage(value) {
        var key = "KEY_HasCustomImage";
        Common.SetItemOfKey(key, value);
    }


    IsCustom() {
        var idx = LevelManager.main.placeLevel;
        var infoPlace = LevelManager.main.GetPlaceItemInfo(idx);
        if (infoPlace.id == GameData.Place_Custom) {
            return true;
        }
        return false;
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
