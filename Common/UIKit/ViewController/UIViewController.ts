
import { _decorator, Component, Node, CCObject, CCInteger, UITransform } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;

import { UIView } from "./UIView";
import { NaviViewController } from '../NaviBar/NaviViewController';

@ccclass('UIViewController')
export class UIViewController extends CCObject {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    index: number;
    id: string;
    title: string;



    // @type(Node) // Declare that the cc type of the attribute _targetNode is Node
    objController: Node | null = null;

    naviController: NaviViewController | null = null;

    view: UIView | null = null;
    CreateObjController() {

        if (this.objController == null) {
            this.objController = new Node('Controller');
        }
        this.ViewDidLoad();


    }
    DestroyObjController() {
        this.ViewDidUnLoad();
        if (this.objController != null) {
            this.objController.destroy();
            this.objController = null;
        }
    }

    //SetViewParent
    SetViewParent(node: Node | null) {

        console.log("SetViewParent node");
        if (node == null) {
            console.log("SetViewParent node is null");
        }
        if (this.objController == null) {
            this.CreateObjController();
        }
        if (this.objController == null) {
            console.log("objController is null");
        } else {
            this.objController.setParent(node); 
            var size = node.getComponent(UITransform).contentSize;
            this.objController.addComponent(UIView);
            this.objController.addComponent(UITransform);
            this.objController?.getComponent(UITransform)?.setContentSize(size);
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    //virtual
    LayOut() {
        if(this.view!=null)
        {
            this.view.LayOut();
        }
    }
    ViewDidLoad() {
    }

    ViewDidUnLoad() {
    }


    // 显示ui后调用
    ViewDidAppear() {
        if(this.naviController!=null){
            this.naviController.OnNextUIDidAppear();
        }
    }

    // 销毁ui后调用
    ViewDidUnAppear() {
    }

    //UIView view
    AddView(view: UIView) {
    }




    UpdateLanguage() {
        if (this.view == null) {
            return;
        }
        //child
        var children = this.objController.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var viewchild = child.getComponent(UIView);
            if (viewchild != null) {
                viewchild.UpdateLanguage();
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
