
import { _decorator, Component, Node, Prefab, Layout } from 'cc';
import { UIButton } from '../../../../Common/UIKit/UIButton/UIButton';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData, GameStatus } from '../../Data/GameData';
import { LayOutUtil } from '../../../../Common/UIKit/LayOut/LayOutUtil';
import { GameMerge } from './GameMerge';
import { PropType } from './UIPopProp';
import { UIGameMerge } from './UIGameMerge';
import { PopUpManager } from '../../../../Common/UIKit/PopUp/PopUpManager';
import { ConfigPrefab } from '../../../../Common/Config/ConfigPrefab';
import { AdKitCommon } from '../../../../Common/AdKit/AdKitCommon';
import { UIImage } from '../../../../Common/UIKit/UIImage/UIImage';
import { Debug } from '../../../../Common/Debug';
import { LayOutBase } from '../../../../Common/UIKit/LayOut/LayOutBase';
const { ccclass, property, type } = _decorator;

@ccclass('UIToolBar')
export class UIToolBar extends UIView {
    @type(UIImage)
    imageBg: UIImage | null = null;

    @type(UIButton)
    btnImageSelect: UIButton | null = null;
    onLoad() {
        super.onLoad();
    }
    start() {
        super.start();

        // if (!GameData.main.IsCustom()) {
        //     this.btnImageSelect.SetActive(false);
        // }
        this.LayOut();

    }



    LayOut() {
        super.LayOut();

        var rctran = this.GetContentSize();
        var w = rctran.width;
        var h = rctran.height;

        var btn = this.node.getComponentInChildren(UIButton);
        var rctranBtn = btn.GetContentSize();

        var count = LayOutUtil.main.GetChildCount(this.node, false)+1;
        var ly = this.node.getComponentInChildren(LayOutBase);
        // count =10;
        var oft =  ly.space.y;
        // oft = 32;
        h = count * (rctranBtn.height +oft);
        // h = 512;
        this.SetContentSize(w, h);

        // super.LayOut();


        this.imageBg.LayOut();
    }
    ShowPop(type: PropType) {
        if (!GameMerge.main.IsHasFalledBall()) {
            return;
        }
        GameData.main.status = GameStatus.Prop;
 
        var key = "UIPopProp";
        var strPrefab = ConfigPrefab.main.GetPrefab(key);

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    ui.UpdateType(type);
                    AdKitCommon.main.ShowAdVideo();
                },
                close: (ui: any) => {
                },
            });

    }

    ShowImageSelect( isAd:boolean) { 
        GameData.main.status = GameStatus.Prop;
        var strPrefab = ConfigPrefab.main.GetPrefab("UIOptionImageSelect");

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    if (isAd) {
                        // AdKitCommon.main.ShowAdVideo();
                    }
                },
                close: (ui: any) => {
                },
            });
    }

    // 锤子 摧毁指定球兵获得积分
    OnClickBtnHammer(event: Event, customEventData: string) {
        Debug.Log("PopUpManager OnClickBtnHammer");
        this.ShowPop(PropType.Hammer);
    }


    //  万能球 将下落的球变为指定类型球
    OnClickBtnMagic(event: Event, customEventData: string) { 
        this.ShowPop(PropType.Magic);
    }


    // 大木zhui  摧毁所有的同类球并获得积分
    OnClickBtnBomb(event: Event, customEventData: string) { 
        this.ShowPop(PropType.Bomb);
    }
    OnClickBtnOptionImageSelect(event: Event, customEventData: string) {
        this.ShowImageSelect(true);
    }

    OnClickBtnOptiongGame(event: Event, customEventData: string) { 
        GameData.main.status = GameStatus.Prop;
        var strPrefab = ConfigPrefab.main.GetPrefab("UIOptionGame");

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                  
                },
                close: (ui: any) => {
                },
            });
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
