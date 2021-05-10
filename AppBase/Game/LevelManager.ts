
import { _decorator, Component, Node, Prefab, CCObject } from 'cc';
import { GameLevelParse } from '../../Apps/Merge/Data/GameLevelParse';
import { Common } from '../../Common/Common';
import { Debug } from '../../Common/Debug';
import { ItemInfo } from '../../Common/ItemInfo';
import { GameViewController } from './GameViewController';
const { ccclass, property, type } = _decorator;


@ccclass('LevelManager')
export class LevelManager extends CCObject {

    placeLevel = 0;
    objGuanka=null;
    static _main: LevelManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LevelManager();
        }
        return this._main;
    }

    //get 的用法
    get gameLevel() {
        var key = "KEY_GAME_LEVEL_PLACE" + this.placeLevel;
        return Common.GetIntOfKey(key, 0);
    }
    // set 的用法
    set gameLevel(value) {
        var key = "KEY_GAME_LEVEL_PLACE" + this.placeLevel;
        Common.SetItemOfKey(key, value);
    }


    //get 的用法
    get gameLevelFinish() {
        var key = "KEY_GAME_LEVEL_PLACE_FINISH" + this.placeLevel;
        return Common.GetIntOfKey(key, 0);
    }
    // set 的用法
    set gameLevelFinish(value) {
        var key = "KEY_GAME_LEVEL_PLACE_FINISH" + this.placeLevel;
        Common.SetItemOfKey(key, value);
    }
    //get 的用法
    get placeTotal() {
        var ret = GameLevelParse.main.GetPlaceTotal();
        return ret;
    }
    get maxGuankaNum() {
        var ret = GameLevelParse.main.GetGuankaTotal();
        return ret;
    }
    listPlace: ItemInfo[] = [];
    Init() {
        //this.ParseGuanka();
    }


    GetPlaceItemInfo(idx) {
        // var game = GameViewController.main.gameBase;
        var info = this.listPlace[idx];
        Debug.Log("GetPlaceItemInfo idx=" + idx + " LevelManager.listPlace.length=" + this.listPlace.length);
        return info;
    }

    CleanGuankaList() {
        GameLevelParse.main.CleanGuankaList();
    }

 /*
{ 
success: (p:any) => {
    
}, 
fail: (p:any) => {
    
},
}
*/

    StartParseGuanka(obj: any) {
        this.objGuanka = obj;
        this.CleanGuankaList();
        // GameViewController.main.gameBase.StartParseGuanka(callback);
        GameLevelParse.main.StartParseGuanka(obj);
    }


     /*
{ 
success: (p:any) => {
    
}, 
fail: (p:any) => {
    
},
}
*/
    //place 
    StartParsePlace(obj: any) {
        //GameViewController.main.gameBase.StartParsePlaceList(callback);
        GameLevelParse.main.StartParsePlaceList(obj);
    }



    GotoPreLevel() {

        this.gameLevel--;
        if (this.gameLevel < 0) {
            this.GotoPrePlace();
            return;

        }
        // GameManager.GotoGame();
        GameViewController.main.gameBase.UpdateGuankaLevel(this.gameLevel);

    }

    GotoNextLevel() {
        Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        this.gameLevel++;
        Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (this.gameLevel >= this.maxGuankaNum) {
            Debug.Log("GotoNextPlace:gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
            this.GotoNextPlace();
            return;

        }
        GameViewController.main.gameBase.UpdateGuankaLevel(this.gameLevel);

    }


    GotoNextPlace() {

        this.placeLevel++;

        if (this.placeLevel >= this.placeTotal) {
            this.placeLevel = 0;

        }
        //必须在placeLevel设置之后再设置gameLevel
        this.gameLevel = 0;

        this.StartParseGuanka(this.objGuanka);
        GameViewController.main.gameBase.UpdateGuankaLevel(this.gameLevel);

    }

    GotoPrePlace() {

        this.placeLevel--;
        if (this.placeLevel < 0) {
            this.placeLevel = this.placeTotal - 1;

        }
        //必须在placeLevel设置之后再设置gameLevel
        this.gameLevel = 0;

        this.StartParseGuanka(this.objGuanka);
        GameViewController.main.gameBase.UpdateGuankaLevel(this.gameLevel);

    }
    //关卡循环
    GotoNextLevelWithoutPlace() {
        Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        this.gameLevel++;
        Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (this.gameLevel >= this.maxGuankaNum) {
            this.gameLevel = 0;

        }
        GameViewController.main.gameBase.UpdateGuankaLevel(this.gameLevel);

    }

    //return List<object>
    GetGuankaListOfAllPlace() {
        var listRet;// = new List<object>();
        Debug.Log("GetGuankaListOfAllPlace placeTotal=" + this.placeTotal);
        for (var i = 0; i < this.placeTotal; i++) {
            this.placeLevel = i;
            //必须在placeLevel设置之后再设置gameLevel
            this.gameLevel = 0;
            this.StartParseGuanka(this.objGuanka);
            // if (UIGameBase.listGuanka == null) {
            //     Debug.Log("listGuanka is null");
            // }
            // else {
            //     foreach(object obj in UIGameBase.listGuanka)
            //     {
            //         listRet.Add(obj);
            //     }
            // }


        }
        return listRet;

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
