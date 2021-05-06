
import { _decorator, Component, Node, Prefab, CCObject } from 'cc';
import { LevelManager } from '../../../AppBase/Game/LevelManager';
import { Common } from '../../../Common/Common';
import { Debug } from '../../../Common/Debug';
import { ItemInfo } from '../../../Common/ItemInfo';
import { GameData } from './GameData';
const { ccclass, property, type } = _decorator;


@ccclass('GameLevelParse')
export class GameLevelParse extends CCObject {

    listGameItems:CCObject[]=[];
    listGameItemDefault:CCObject[]=[];

    static _main: GameLevelParse;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameLevelParse(); 
        }
        return this._main;
    }

   
    CleanGuankaList() {
        if (this.listGameItems != null) {
            this.listGameItems.splice(0, this.listGameItems.length);
        }

    }
    GetItemInfo(idx:number) {
        return this.listGameItems[idx];
    }
    GetLastItemInfo() { 
        Debug.Log("GameItems:GetLastItemInfo this.listGameItems=" + this.listGameItems.length);
        return this.listGameItems[this.listGameItems.length - 1];
    }
    GetGuankaTotal() {
        return this.listGameItems.length;
    }
    GetImagePath(id:string) {
        // return id;
        if (GameData.main.IsCustom()) {
            return this.GetCustomImagePath(id);
        }
        var idx = LevelManager.main.placeLevel;
        return this.GetImagePathPlace(id, idx);
    }
    GetCustomImagePath(id) {
        var pic = this.GetSaveCustomImagePath(id);
        if (!cc.FileUtil.FileExist(pic)) {
            pic = this.GetImagePathPlace(id, 0);
        }
        return pic;
    }

    // string 
    GetSaveCustomImagePath(id) {
        return cc.Common.GAME_RES_DIR + "/Image/" + id + ".png";
    }
    IsRenderCustomImage(id) {
        if (GameData.main.IsCustom()) {
            if (this.IsHasCustomImage(id)) {
                return true;
            }
        }
        return false;
    }

    IsHasCustomImage(id) {
        var pic = this.GetSaveCustomImagePath(id);
        if (cc.FileUtil.FileExist(pic)) {
            return true;
        }
        return false;
    }
    GetImagePath(id) {
        if (GameData.main.IsCustom()) {
            return this.GetCustomImagePath(id);
        }
        var idx = LevelManager.main.placeLevel;
        return this.GetImagePathPlace(id, idx);

    }

    GetImagePathDefault(id) {
        return this.GetImagePathPlace(id, 0);
    }
    GetImagePathPlace(id, idx) {
        var infoPlace = LevelManager.main.GetPlaceItemInfo(idx);
        return cc.CloudRes.main().rootPath + "/Image/" + infoPlace.id + "/" + id + ".png";
    } 

    ParseGameItemJson(json) {

        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }

        this.ParseGuankaDidFinish();
    }


    ParseGameItems(json) {
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }
        Debug.Log("GameItems:this.listGameItems=" + this.listGameItems.length);
        this.ParseGuankaDidFinish();
    }

    ParseGameItemsDefault(json) {
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItemDefault.push(info);
        }

        // this.ParseGuankaDidFinish();
    }


    StartParseGameItems() {
        if ((this.listGameItems != null) && (this.listGameItems.length != 0)) {
            return;
        }

        var idx = LevelManager.main.placeLevel;
        var infoPlace = LevelManager.main.GetPlaceItemInfo(idx);
        var filepath = Common.GAME_RES_DIR + "/Level/" + infoPlace.id;// + ".json";
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                Debug.Log("GameItems:err=" + err);
            }
            if (err == null) {
                Debug.Log("GameItems:ParseGameItems");
                this.ParseGameItems(rootJson.json);
            }
        }.bind(this));

    }


    StartParseGameItemsDefault() {
        if ((this.listGameItemDefault != null) && (this.listGameItemDefault.length != 0)) {
            return;
        }

        var idx = 0;
        var infoPlace = LevelManager.main.GetPlaceItemInfo(idx);
        var filepath = Common.GAME_RES_DIR + "/Level/" + infoPlace.id;// + ".json";
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                Debug.Log("GameItems:err=" + err);
            }
            if (err == null) {
                this.ParseGameItemsDefault(rootJson.json);
            }
        }.bind(this));

    }



    StartParseGuanka(callback) {
        this.callbackGuankaFinish = callback;
        this.StartParseGameItems();
        this.StartParseGameItemsDefault();
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
