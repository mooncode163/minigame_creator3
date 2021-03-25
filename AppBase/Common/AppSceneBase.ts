
import { _decorator, Component, Node, Canvas,View, Size, director, size } from 'cc'; 
const { ccclass, property, integer, float, boolean, string, type } = _decorator;
import { UIViewController } from "../../Common/UIKit/ViewController/UIViewController";
import { LoadItemInfo } from "./LoadItemInfo";

@ccclass('AppSceneBase')
export class AppSceneBase extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    rootViewController: UIViewController | null = null;

    @type(Canvas) // Declare that the cc type of the attribute _targetNode is Node
    canvasMain: Canvas | null = null;

    @type(Node) 
    rootNode: Node | null = null;

    sizeCanvas:Size| null = null;


    @type([Node]) // declare the cc type of the attribute _children as a Node array
    private listProLoad: LoadItemInfo[] = [];

    isHasRunApp = false;
    
    onLoad () {
        // [3]
    console.log("AppSceneBase onLoad");
    this.isHasRunApp = false;
    // this.InitValue();

    this.RunApp();
    }
    start () {
        // [3]
    console.log("AppSceneBase start");
    }
    // update (deltaTime: number) {
    //     // [4]
    // }

    InitValue () {
        // [3]
    console.log("AppSceneBase InitValue");
    let screenSize = Size.ZERO;
    screenSize = director.getWinSizeInPixels();//屏幕分辨率
    console.log("screen size width=" + screenSize.width + ",height=" + screenSize.height);

    }

    RunApp () {
        console.log("AppSceneBase RunApp");

    } 

    SetRootViewController (controller:UIViewController) {

        if (this.rootViewController != null) {
            this.rootViewController.DestroyObjController();
        }
        this.rootViewController = controller;
        this.rootViewController.SetViewParent(this.rootNode);//this.rootNode  this.canvasMain.node


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
