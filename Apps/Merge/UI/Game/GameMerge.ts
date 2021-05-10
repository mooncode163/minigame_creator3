
import { _decorator, Component, Node, Prefab, CCObject, director, instantiate } from 'cc';
import { GameBase } from '../../../../AppBase/Game/GameBase';
import { PrefabCache } from '../../../../Common/Cache/PrefabCache';
import { Debug } from '../../../../Common/Debug';
import { UITouchEvent } from '../../../../Common/UIKit/UITouchEvent';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { UIMergeItem } from './UIMergeItem';
const { ccclass, property, type } = _decorator;

@ccclass('GameMerge')
export class GameMerge extends GameBase {


    static TimeStep = 0.8;

    ScaleStart: 0.4;
    isFirstRun = false;
    prefabItem = null;
    uiItem = null;
    listItem:UIMergeItem[] = [];

    time = 1.0;
    hasItBeenGenerated = false;
    isMouseDown = false;
    isMouseUp = false;
    isAutoClick = false;
    posYInit: 0;
    nodeDeadline = Node;

    static _main: GameMerge;
    //静态方法
    static get main() {
        return this._main;
    }
    onLoad() {
        super.onLoad();
        GameMerge._main = this; 
        this.time = 0;
        this.LoadPrefab();
        // this.setContentSize(this.node.parent.getContentSize());

        this.LayOut();
    }
    start() {
        super.start();
        this.LayOut();
    }
    LayOut() {
        super.LayOut();
    }
    UpdateLevel(level: number) {
        super.UpdateLevel(level);
    }

 


    LoadPrefab() {
        // PrefabCache.main.LoadByKey("UIMergeItem", function (err, prefab) {
        //     if (err) {
        //         Debug.Log("LoadGamePrefab err=" + err.message || err);
        //         return;
        //     }
        //     this.prefabItem = prefab;
        //     this.StartGame();

        // }.bind(this)
        // );
    }

    StartGame() {
        var ev = this.node.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
        this.time = GameMerge.TimeStep;
    }


    update() {         //用作延迟生成物体
        if (this.time < GameMerge.TimeStep) {
            var tick = director.getDeltaTime();
            // Debug.Log("update tick="+tick);
            this.time += director.getDeltaTime();
        }
        else {
            //判断场景中没有生成物体
            if (!this.hasItBeenGenerated)
            // if (isMouseDown)
            {
                var key = this.RandomFruitImageKey();
                // key ="juzi";
                this.uiItem = this.CreateItem(key);
                // this.GetComponent<SizeChange>().GettingBigger(fruitInTheScene);//使物体缓慢变大

                this.hasItBeenGenerated = true;//更改hasItBeenGenerated状态
            }

            // if (isAutoClick) {
            //     UpdateEvent(UITouchEvent.STATUS_TOUCH_DOWN);
            // }

        }


    }

    OnDestroy() {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            uilist.node.destroy();
        }
        this.listItem.splice(0, this.listItem.length);

    }
    GetTotalItems() {
        return GameLevelParse.main().listGameItems.length;
    }
    GetItemId(idx) {
        var info = GameLevelParse.main().GetItemInfo(idx);
        return info.id;
    }

    //随机获取水果
    RandomFruitImageKey() {
        var rdm = 0;
        if (this.GetTotalItems() >= 4)//判断总水果是否大于4个
        {
            rdm = Common.RandomRange(0, 4);
        }
        else {
            rdm = Common.RandomRange(0, this.GetTotalItems());
        }
        if (this.isFirstRun) {
            this.isFirstRun = false;
            rdm = 0;
        }

        return this.GetItemId(rdm);
    }

    // string
    GetIndexOfItem(key) {
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i)) {
                return i;
            }
        }
        return 0;
    }

    // string
    GetNextItem(key) {
        var ret = "";
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i) && ((i + 1) < this.GetTotalItems())) {
                ret = this.GetItemId(i + 1);
                break;
            }
        }
        return ret;
    }

    GetLastItem(key) {
        var ret = "";
        if (this.GetTotalItems() > 0) {
            ret = this.GetItemId(this.GetTotalItems() - 1);
        }
        return ret;
    }
    OnRestPlay() {
        //  Invoke("OnRestPlayInternal",0.2f);
        this.OnRestPlayInternal();
    }

    OnRestPlayInternal() {
        // UIGameMerge.main.gameStatus = UIGameMerge.Status.Play;
        // UIGameMerge.main.game.ShowProp(false);
    }
    // 改变类型为  string toId
    ChangeItem(toId) {
        if (this.uiItem != null) {
            this.uiItem.id = toId;
            this.uiItem.name = toId;
            var pic = GameLevelParse.main().GetImagePath(toId);
            this.uiItem.UpdateImage(pic);
        }

        this.OnRestPlay();
    }

    // UIMergeItem ui
    DeleteItem(ui) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            if (uilist == ui) {
                ShowMergeParticle(ui.node.position, ui.id);
                uilist.node.destroy();
                this.listItem.splice(i, 1);
                break;
            }
        }
        this.OnRestPlay();
    }

    // Node 
    RemoveItemFromList(objitem) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            var item = objitem.getComponent(UIMergeItem);
            if (uilist == item) {
                this.listItem.splice(i, 1);
                break;
            }
        }

    }

    // 摧毁所有的同类 string
    DeleteAllItemsOfId(id) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            if (uilist.id == id) {
                ShowMergeParticle(ui.node.position, ui.id);
                uilist.node.destroy();
            }
        }
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.id == id) {
                this.listItem.splice(i, 1);
            }
        }
        this.OnRestPlay();
    }

    // string return UIMergeItem
    CreateItem(key) {
        var keyid = key;
        // keyid ="juzi";

        var x, y, w, h;
        var node = instantiate(this.prefabItem);
        var ui = node.getComponent(UIMergeItem);
        ui.hasGoDownDeadLine = false;
        ui.isNew = true;
        ui.id = keyid;
        // ui.index = indexItem++; 
        // AppSceneBase.main.AddObjToMainWorld(ui.gameObject);
        ui.SetParent(this);
        ui.name = keyid;
        ui.node.name = keyid;
        var pic = GameLevelParse.main().GetImagePath(key);
        ui.UpdateImage(pic);

        ui.EnableGravity(false);
        this.ScaleStart = 0.2;
        // var scale = (this.ScaleStart + 0.05 * this.GetIndexOfItem(key)) * 0.8; 
        var scale = (this.ScaleStart + 0.1 * this.GetIndexOfItem(key));
        // scale =1;
        ui.node.scaleX = scale;
        ui.node.scaleY = scale;
        var rectParent = this.GetBoundingBox();
        x = 0;
        y = rectParent.height / 2 - ui.GetBoundingBox().height;

        // y = 512;
        this.posYInit = y;
        Debug.Log("OnCollisionEnter2D this.posYInit=" + this.posYInit + " key=" + key);
        ui.node.setPosition(x, y);
        // ui.transform.localScale = new Vector3(scale, scale, 1);
        // ui.transform.localPosition = new Vector3(0, posYInit, -1);
        this.listItem.push(ui);
        return ui;
    }
    ShowMergeParticle(pos, id) {


    }

    OnTouchDown(pos) {
    }
    OnTouchMove(pos) {
    }
    OnTouchUp(pos) {
    }
    OnUITouchEvent(ev, status, event) {

        var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点

        switch (status) {
            case UITouchEvent.TOUCH_DOWN:
                this.OnTouchDown(posnodeAR);
                break;

            case UITouchEvent.TOUCH_MOVE:
                this.OnTouchMove(posnodeAR);
                break;

            case UITouchEvent.TOUCH_UP:
                this.OnTouchUp(posnodeAR);
                break;
        }

        this.UpdateEvent(status, posnodeAR);
    }


    UpdateEvent(status, point) {

        if (GameData.main.status == GameData.GameStatus.Prop) {
            return;
        }

        {


            //判断是否点击
            // if (Input.GetMouseButton(0))
            if (UITouchEvent.TOUCH_DOWN == status) {
                this.isMouseDown = true;
            }



            if (this.isMouseDown && (GameData.main.status == GameData.GameStatus.Play)) {

                // string key = RandomFruitImageKey();
                // uiItem = CreateItem(key);

                // Debug.Log("autoclick MouseClickDown isMouseDown ");
                this.isMouseDown = false;
                //// float mousePosition_x = Input.mousePosition.x;//获取点击位置(只需要x轴位置)//这样获取的不是世界坐标系 所以废弃

                // Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);//获取点击位置
                var mousePosition = point;
                if (this.isAutoClick) {
                    mousePosition.x = 0;
                }
                if (this.uiItem != null) {
                    if (this.uiItem.isNew) {
                        // var pos = new Vector3(mousePosition.x, posYInit, 0);//更改水果在场景中的位置
                        mousePosition.y = this.posYInit;
                        var value = 3.0;
                        var ratio = 0.2;
                        if (this.isAutoClick) {
                            ratio = 1;
                        }
                        mousePosition.x += Common.RandomRange(-value, value) * ratio;
                        // 生成物体 使用随机防止同地点击无限堆高
                        // uiItem.transform.position = pos + new Vector3(UnityEngine.Random.Range(-value, value) * ratio, UnityEngine.Random.Range(-value, value) * ratio, 0);//!
                        // uiItem.transform.position = pos + new Vector3(UnityEngine.Random.Range(-value, value) * ratio, 0, 0);//!
                        this.uiItem.node.setPosition(mousePosition);


                    }
                }

            }

            if ((UITouchEvent.TOUCH_MOVE == status) && (!this.isAutoClick)) {
                var mousePosition = point;
                // Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);//获取点击位置
                if (this.uiItem != null) {
                    if (this.uiItem.isNew) {
                        // Vector3 pos = new Vector3(mousePosition.x, posYInit, 0);//更改水果在场景中的位置
                        mousePosition.y = this.posYInit;
                        this.uiItem.node.setPosition(mousePosition);
                    }
                }
            }
            //判断是否完成点击
            // if (Input.GetMouseButtonUp(0))
            if (UITouchEvent.TOUCH_UP == status) {
                this.isMouseUp = true;
            }

            if (this.isMouseUp && (GameData.main.status == GameData.GameStatus.Play)) {
                // Debug.Log("autoclick MouseClickUp isMouseUp ");
                this.isMouseUp = false;
                //让水果获得重力下降
                // fruitInTheScene.GetComponent<Rigidbody2D>().simulated = true;
                if (this.uiItem != null) {
                    this.uiItem.EnableGravity(true);
                    this.uiItem.isNew = false;
                    // this.uiItem = null;//清除保存的水果
                }
                this.hasItBeenGenerated = false;//更改hasItBeenGenerated状态

                this.time = 0;

            }
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
