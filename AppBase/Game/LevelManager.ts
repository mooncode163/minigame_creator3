
import { _decorator, Component, Node, Prefab, CCObject } from 'cc';
import { GameLevelParse } from '../../Apps/Merge/Data/GameLevelParse';
import { Common } from '../../Common/Common';
import { Debug } from '../../Common/Debug';
import { ItemInfo } from '../../Common/ItemInfo';
import { GameViewController } from './GameViewController';
import { LevelData } from './LevelData';
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
 
    get maxGuankaNum() {
        var ret = GameLevelParse.main.GetGuankaTotal();
        return ret;
    } 
    Init() {
        //this.ParseGuanka();
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

        LevelData.main.gameLevel--;
        if (LevelData.main.gameLevel < 0) {
            this.GotoPrePlace();
            return;

        }
        // GameManager.GotoGame();
        GameViewController.main.gameBase.UpdateGuankaLevel(LevelData.main.gameLevel);

    }

    GotoNextLevel() {
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        LevelData.main.gameLevel++;
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (LevelData.main.gameLevel >= this.maxGuankaNum) {
            Debug.Log("GotoNextPlace:gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
            this.GotoNextPlace();
            return;

        }
        GameViewController.main.gameBase.UpdateGuankaLevel(LevelData.main.gameLevel);

    }


    GotoNextPlace() {

        this.placeLevel++;

        if (this.placeLevel >= LevelData.main.placeTotal) {
            this.placeLevel = 0;

        }
        //必须在placeLevel设置之后再设置gameLevel
        LevelData.main.gameLevel = 0;

        this.StartParseGuanka(this.objGuanka);
        GameViewController.main.gameBase.UpdateGuankaLevel(LevelData.main.gameLevel);

    }

    GotoPrePlace() {

        this.placeLevel--;
        if (this.placeLevel < 0) {
            this.placeLevel = LevelData.main.placeTotal - 1;

        }
        //必须在placeLevel设置之后再设置gameLevel
        LevelData.main.gameLevel = 0;

        this.StartParseGuanka(this.objGuanka);
        GameViewController.main.gameBase.UpdateGuankaLevel(LevelData.main.gameLevel);

    }
    //关卡循环
    GotoNextLevelWithoutPlace() {
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        LevelData.main.gameLevel++;
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (LevelData.main.gameLevel >= this.maxGuankaNum) {
            LevelData.main.gameLevel = 0;

        }
        GameViewController.main.gameBase.UpdateGuankaLevel(LevelData.main.gameLevel);

    }

    //return List<object>
    GetGuankaListOfAllPlace() {
        var listRet;// = new List<object>();
        Debug.Log("GetGuankaListOfAllPlace placeTotal=" + LevelData.main.placeTotal);
        for (var i = 0; i < LevelData.main.placeTotal; i++) {
            this.placeLevel = i;
            //必须在placeLevel设置之后再设置gameLevel
            LevelData.main.gameLevel = 0;
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
