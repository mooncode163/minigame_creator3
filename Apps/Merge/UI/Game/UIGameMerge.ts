
import { _decorator, Component, Node, Prefab, instantiate, UITransform } from 'cc';
import { UIGameBase } from '../../../../AppBase/Game/UIGameBase';
import { AudioPlay } from '../../../../Common/Audio/AudioPlay';
import { ConfigPrefab } from '../../../../Common/Config/ConfigPrefab';
import { Debug } from '../../../../Common/Debug';
import { Language } from '../../../../Common/Language/Language';
import { PopUpManager } from '../../../../Common/UIKit/PopUp/PopUpManager';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData } from '../../Data/GameData';
import { GameLevelParse } from '../../Data/GameLevelParse';
import { GameMerge } from './GameMerge';
import { UIText } from '../../../../Common/UIKit/UIText/UIText';
import { LevelManager } from '../../../../AppBase/Game/LevelManager';
import { LevelData } from '../../../../AppBase/Game/LevelData';
import { UIToolBar } from './UIToolBar';
import { UIPopProp, PropType } from './UIPopProp';
import { PrefabCache } from '../../../../Common/Cache/PrefabCache';
const { ccclass, property, type } = _decorator;



@ccclass('UIGameMerge')
export class UIGameMerge extends UIGameBase {

    @type(UIText)
    titleScore: UIText | null = null; 

    game:GameMerge = null;
    // nodeImageBg:Node,
    isShowGame= false; 
 
    uiToolBar:UIToolBar;

    typeProp:PropType;

    static _main: UIGameMerge;
    //静态方法
    static get main() {
        return this._main;
    }
 
  
    LayOut() {
        super.LayOut();
    }
 
    onLoad () {
        super.onLoad();
        UIGameMerge._main = this;
        this.LayOut();
        // this.LoadLanguageGame(); 
        // this.textTitle.node.active = false;
        
    }
    start () {
        super.start();
        this.LayOut();
 
        // this.ShowGameWinAlert();
        // this.OnGameFinish(true);
        // this.LoadUIPopProp();
    }
    LoadUIPopProp() {
        var key = "UIPopProp";
        key = "UIGameFail"
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => { 
                    var node = instantiate(data); 
                    node.parent = this.node;
                },
                fail: () => {
                },
            });


    }

    CreateGame () {
        this.UpdateLevel(LevelData.main.gameLevel);
        // this.OnGameFinish(true);

    }

    CreateGameInteranl () {
        if(this.game!=null)
        {
            this.game.OnDestroy();
            this.game.destroy();
        }
        var node = instantiate(this.gamePrefab);
        this.game = node.getComponent(GameMerge);
        this.game.node.parent = this.node; 
        //zorder  priority 让imageBg 显示在最底层，game显示在UI下面
        // 
        // zIndex priority
        this.imageBg.node.getComponent(UITransform).priority = -20; 
        this.game.node.getComponent(UITransform).priority = -10;
        this.isShowGame = true;
        // this.callbackGuankaFinish = null;
      

    }
    UpdateScore () {
        var str = Language.main.GetString("Score") + ":" + GameData.main.score.toString();
        Debug.Log("UpdateScore str="+str);
        this.titleScore.text = str;
        this.LayOut();
       
    }


    UpdateLevel(level: number) {
        super.UpdateLevel(level); 
        Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        // return;
        
        GameData.main.isGameFail = false;
        
        GameData.main.score = 0;
        this.CreateGameInteranl();
        
        this.UpdateScore();
        // this.game.textTitle = this.textTitle;
        // this.textTitle.node.active = false;

        // this.game.objGameFinish = {
        //     onWin (ui) {
        //         this.OnGameWinFinish(ui, false);
        //     }.bind(this),
        //     onFail (ui) {
        //         this.OnGameWinFinish(ui, true);
        //     }.bind(this),
        // };

        // this.game.LoadGame(GameManager.gameMode);
        // this.LoadUIPopProp();

    }

 
    OnGameFinish(isFail:boolean) {
        // var info = GameLevelParse.main.GetLevelItemInfo(LevelData.main.gameLevel);  
        var key = "UIGameWin";
        var strPrefab = "";
        //show game win
        if (isFail)
        { 
            // this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);
            
            key = "UIGameFail"; 
        }

        strPrefab = ConfigPrefab.main.GetPrefab(key);

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    // AudioPlay.main.PlayByKey("Fail");
                },
                close: (ui: any) => {
                },
            });
    }

     ShowProp()
    {
        this.uiToolBar.OnClickBtnBomb(null,null);
        this.OnUIDidFinish();
    }

     OnGameProp(  ui:UIPopProp,   type:PropType)
    {
        this.typeProp = type;

        Debug.Log("OnGameProp typeProp=" + this.typeProp);
        switch (type)
        {
            case PropType.Hammer:
                {

                }
                break;
            case PropType.Magic:
                {
                    GameMerge.main.ChangeItem(ui.idChangeTo);
                }
                break;
            case PropType.Bomb:
                {

                }
                break;
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
