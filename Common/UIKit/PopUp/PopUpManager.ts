
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('PopUpManager')
export class PopUpManager extends CCObject {
    static _main: PopUpManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new PopUpManager();
            // this._main.Init();
        }
        return this._main;
    }
    statics: {
        //enum
        ANIMATE_DURATION: 0.8,
    }
    properties: {
        listItem: {
            default: [],
            type: cc.UIViewPop
        }
        nodePannel: cc.Node,

        /*
        {
        prefab: "", 
        open (ui) {
        }
        close (ui) {
         } 
         }
        */

        objPop: null,
    }



    Show(obj) {
        this.objPop = obj;
        this.LoadBg();
    }


    LoadBg() {
        var strPrefab = "Common/Prefab/UIKit/UIPopUp/PopUpBgPannel";
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                Debug.Log("PopUpManager  LoadBg err=" + err.message || err);
                return;
            }
            this.LoadBgInternal(prefab);
        }.bind(this)
        );
    }
    LoadBgInternal(prefab) {
        var nodeRoot = cc.Common.appSceneMain.rootNode;
        var node = cc.instantiate(prefab);
        // var panel = new cc.Node("Panel");
        node.setParent(nodeRoot);
        node.setContentSize(cc.Common.appSceneMain.sizeCanvas);
        node.color = new cc.Color(52, 52, 52, 50);
        //拦截点击
        //  panel.addComponent(cc.BlockInputEvents);
        this.nodePannel = node;
        // this.nodePannel.active = false;

        cc.PrefabCache.main.Load(this.objPop.prefab, function (err, prefab) {
            if (err) {
                Debug.Log("PopUpManager err=" + err.message || err);
                return;
            }
            this.OpenPopup(prefab);
        }.bind(this)
        );
    }

    OpenPopup(prefab) {
        Debug.Log("OpenPopup");
        var nodeRoot = cc.Common.appSceneMain.rootNode;
        var nodePop = cc.instantiate(prefab);
        nodePop.setParent(nodeRoot);
        var ui = nodePop.getComponent(UIViewPop);
        if (nodePop == null) {
            Debug.Log("OpenPopup nodePop is null");
        }
        if (ui == null) {
            Debug.Log("OpenPopup ui is null");
        }
        this.listItem.push(ui);

        if (this.objPop.open != null) {
            this.objPop.open(ui);
        }
        /* 
        Canvas canvas = AppSceneBase.main.canvasMain;
       // var panel = new GameObject("Panel");
         var panel = new cc.Node("Panel");
        var panelImage = panel.AddComponent<Image>();
        var color = Color.black;
        color.a = 0;
        panelImage.color = color;
        var panelTransform = panel.GetComponent<RectTransform>();
        panelTransform.anchorMin = new Vector2(0, 0);
        panelTransform.anchorMax = new Vector2(1, 1);
        panelTransform.pivot = new Vector2(0.5f, 0.5f);
        panel.transform.SetParent(canvas.transform, false);
        currentPanels.Push(panel);
        StartCoroutine(FadeIn(panel.GetComponent<Image>(), 0.2f));
 
        //var popup = Instantiate(request.asset) as GameObject;
        var popup = Instantiate(objPrefab) as GameObject;
        Assert.IsNotNull((popup));
        popup.transform.SetParent(canvas.transform, false);
 
       
 
        if (onOpened != null) {
            onOpened(popup.GetComponent<T>());
        }
        _onClose = onClose;
        currentPopups.Push(popup);
        */
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayCloudAudio("PopUp/PopupOpen.mp3");
        }
 
    }


    OnClose() {

    }
    /// <summary>
    /// Closes the topmost popup.
    /// </summary>
    CloseCurrentPopup() {
        /*
       var currentPopup = currentPopups.Peek();
       if (currentPopup != null) {
           currentPopup.GetComponent<UIViewPop>().Close();
       } 
       */
    }

    /// <summary>
    /// Closes the topmost popup.
    /// </summary>
    ClosePopup() {

        if (this.nodePannel != null) {
            this.nodePannel.destroy();
            this.nodePannel = null;
        }
        if (this.listItem.length == 0) {
            return;
        }
        var ui = this.listItem[0];
        if (ui == null) {
            return;
        }

        //删除index为0的元素
        this.listItem.splice(0, 1);

        // ui.Close();
        /*
    
    
        var topmostPanel = currentPanels.Pop();
        if (topmostPanel != null) {
            StartCoroutine(FadeOut(topmostPanel.GetComponent<Image>(), 0.2f, () => Destroy(topmostPanel)));
        }
    
        if (_onClose != null) {
            _onClose(topmostPopup.GetComponent<UIViewPop>());
        }
        */
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayCloudAudio("PopUp/PopupClose.mp3");
        }

        var duration = PopUpManager.ANIMATE_DURATION;
        var actionTo1 = cc.scaleTo(duration / 2, 1.2);
        var actionTo2 = cc.scaleTo(duration / 2, 0);
        var seq = cc.sequence([actionTo1, actionTo2, cc.callFunc(function () {
            ui.DoClose();
        }.bind(this))]);
        ui.node.runAction(seq);
    }



    /// <summary>
    /// Utility coroutine to fade in the specified image.
    /// </summary>
    /// <param name="image">The image to fade.</param>
    /// <param name="time">The duration of the fade in seconds.</param>
    /// <returns>The coroutine.</returns>
    FadeIn(image, time) {
        //         var alpha = image.color.a;
        //         for (var t = 0.0f; t < 1.0f; t += Time.deltaTime / time)
        // {
        //     var color = image.color;
        //     color.a = Mathf.Lerp(alpha, 220 / 256.0f, t);
        //     image.color = color;

        // }
    }

    /// <summary>
    /// Utility coroutine to fade out the specified image.
    /// </summary>
    /// <param name="image">The image to fade.</param>
    /// <param name="time">The duration of the fade in seconds.</param>
    /// <param name="onComplete">The callback to invoke when the fade has finished.</param>
    /// <returns>The coroutine.</returns>
    FadeOut(image, time, onComplete) {
        //         var alpha = image.color.a;
        //         for (var t = 0.0f; t < 1.0f; t += Time.deltaTime / time)
        // {
        //     var color = image.color;
        //     color.a = Mathf.Lerp(alpha, 0, t);
        //     image.color = color;
        //     yield return null;
        // }
        // if (onComplete != null) {
        //     onComplete();
        // }
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
