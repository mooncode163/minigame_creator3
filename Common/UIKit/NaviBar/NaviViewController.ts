
import { _decorator, Component, Node, Sprite, Label, Prefab, instantiate, UITransform } from 'cc';
import { Debug } from '../../Debug';
import { UIViewController } from '../ViewController/UIViewController';
import { UINaviBar } from './UINaviBar';
import { AppSceneBase } from '../../../AppBase/Common/AppSceneBase';
import { UIView } from '../ViewController/UIView';
const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('NaviViewController')
export class NaviViewController extends UIViewController {
    // @type(Node) // Declare that the cc type of the attribute _targetNode is Node
    objContent: Node | null = null;

    uiNaviBarPrefab: Prefab | null = null;

    uiNaviBar: UINaviBar | null = null;
    rootController: UIViewController | null = null;
    rootControllerPre: UIViewController | null = null;
    listController: UIViewController[] = [];


    LoadPrefab() {

    }

    ViewDidLoad() {
        super.ViewDidLoad();
        this.CreateContent();
        this.LoadPrefab();
    }
    CreateBar() {
        //this.listItem = new Array();
        Debug.Log("NaviViewController CreateBar");
        const node = instantiate(this.uiNaviBarPrefab);
        this.uiNaviBar = node.getComponent(UINaviBar);
        this.uiNaviBar.SetController(this);
    }

    CreateContent() {
        this.objContent = new Node("Content");
        this.objContent.addComponent(UIView);
        var uitran = this.objContent.addComponent(UITransform);
        this.objContent.parent = this.objController;

        var size = AppSceneBase.main.sizeCanvas;//this.objController.getComponent(UITransform).contentSize; 
        uitran.setContentSize(size);

    }

    //  显示了下一个controller ui
    OnNextUIDidAppear() {
        this.DestroyControllerInternal();
    }

    Push(controller: UIViewController) {
        if (controller == null) {
            return;
        }
        this.listController.push(controller);
        //  controller.type = UIViewController.Type.NAVIBAR;
        controller.naviController = this;
        this.UpdateController();

    }

    // 返回上一级
    Pop() {
        if (this.listController.length == 0) {
            Debug.Log("NaviViewController listController.length =0");
            return;
        }
        if (this.rootControllerPre != null) {
            Debug.Log("NaviViewController Pop rootControllerPre is not destroyed");
            return;
        }
        // while(true)
        // {
        //     if(this.rootControllerPre == null)
        //     {
        //         //等待上一个controller销毁,才能返回上一级
        //         break;
        //     }
        //     Debug.Log(" Pop waiting ...");
        // }

        this.listController.splice(this.listController.length - 1, 1);
        this.UpdateController();
    }
    HideNavibar(isHide) {
        if (this.uiNaviBar != null) {
            this.uiNaviBar.node.active = !isHide;
        }
    }
    DestroyController() {
        // 延迟销毁:留上一个ui 不然ui切换时候可能会看到场景的背景
        // AppSceneBase.main.scheduleOnce(this.DestroyControllerInternal.bind(this), 1);
    }

    DestroyControllerInternal() {
        if (this.rootControllerPre != null) {
            this.rootControllerPre.DestroyObjController();
            this.rootControllerPre = null;
        }
    }
    UpdateController() {

        if (this.listController.length == 0) {
            return;
        }
        this.rootControllerPre = this.rootController;
        this.DestroyController();

        this.rootController = this.listController[this.listController.length - 1];
        Debug.Log("UpdateController this.listController.length=" + this.listController.length);
        if (this.objContent != null) {
            Debug.Log("UpdateController SetViewParent");
            //this.rootController = controller;
            this.rootController.SetViewParent(this.objContent);
            //controller.LayOutView();
        }
        if (this.uiNaviBar != null) {
            this.uiNaviBar.HideBtnBack((this.listController.length < 2) ? true : false);
            this.uiNaviBar.UpdateTitle(this.rootController.title);
        }

    }

    LayOut() {
        super.LayOut();
        if (this.rootController != null) {
            this.rootController.LayOut();
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
