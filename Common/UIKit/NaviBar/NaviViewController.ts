
import { _decorator, Component, Node, Sprite, Label, Prefab } from 'cc';
import { PrefabCache } from '../../Cache/PrefabCache';
import { Debug } from '../../Debug';
import { UIView } from '../ViewController/UIView';
import { UIViewController } from '../ViewController/UIViewController';
import { UINaviBar } from './UINaviBar';
const { ccclass, property,type,string } = _decorator;

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

      listController: UIViewController[] = []; 


    LoadPrefab () { 
    //     var strPrefab = "Common/Prefab/NaviBar/UINaviBar";
    //    PrefabCache.main.Load(strPrefab, function (err, prefab) {
    //         this.uiNaviBarPrefab = prefab;
    //         this.CreateBar();

    //     }.bind(this)
    //     );
    }

    ViewDidLoad () {
        super.ViewDidLoad();
        this.CreateContent();
        this.LoadPrefab();
    }
    CreateBar () {

        //this.listItem = new Array();
        Debug.Log("NaviViewController CreateBar"); 
        const node = instantiate(this.uiNaviBarPrefab);
        this.uiNaviBar = node.getComponent(UINaviBar);
        this.uiNaviBar.SetController(this);


    }

    CreateContent () {
        var classname = "Content";
        this.objContent = new Node();
        this.objContent.parent = this.objController;

    }

    Push (controller) {

        if (controller == null) {
            return;
        }
        this.listController.push(controller);
        //  controller.type = UIViewController.Type.NAVIBAR;
        controller.naviController = this;
        this.UpdateController();

    }
    Pop () {
        if (this.listController.length == 0) {
            return;
        } 
        this.listController.splice(this.listController.length - 1,1);
        this.UpdateController();
    }
    HideNavibar (isHide) {
        if (this.uiNaviBar != null) {
            this.uiNaviBar.node.active = !isHide;
        }
    }
    DestroyController () {
        if (this.rootController != null) {
            this.rootController.DestroyObjController();
            this.rootController = null;
        }
    }
    UpdateController () {

        if (this.listController.length == 0) {
            return;
        }
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
