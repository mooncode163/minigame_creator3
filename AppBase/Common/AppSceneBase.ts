
import { _decorator, Component, Node, Canvas, View, Size, director, size, view, math, UITransform, Button, Vec2, Label } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;
import { UIViewController } from "../../Common/UIKit/ViewController/UIViewController";
import { LoadItemInfo } from "./LoadItemInfo";
import { Debug } from '../../Common/Debug';
import { Device } from '../../Common/Device';
import { AppPreLoad } from '../../Common/AppPreLoad';


// typescript 提示 Object is possibly ‘null‘ 的N种解决方法
// https://blog.csdn.net/iamlujingtao/article/details/110573421

@ccclass('AppSceneBase')
export class AppSceneBase extends Component {
    static _main: AppSceneBase;
    //静态方法
    static Main() {
        if (this._main == null) {

        }
        return this._main;
    }

    rootViewController: UIViewController | null = null;

    @type(Canvas) // Declare that the cc type of the attribute _targetNode is Node
    canvasMain: Canvas | null = null;

    @type(Node)
    rootNode: Node | null = null;

    @type(Button)
    btnUpRight: Button | null = null;

    @type(Label)
    textTitle: Label | null = null;

    // @type(Size)
    sizeCanvas: Size | null = null;

    // designWidth=960;
    // designHeight=480;

    // canvasWidth=0;
    // canvasHeight=0;

    @type([Node]) // declare the cc type of the attribute _children as a Node array
    private listProLoad: LoadItemInfo[] = [];

    isHasRunApp = false;

    onLoad() {
        // [3]
        AppSceneBase._main = this;
        Debug.Log("AppSceneBase onLoad");
        this.isHasRunApp = false;
        this.InitValue();
        AppPreLoad.Main().Load(
            {
                success: (p: any) => {
                    this.RunApp();
                },
                fail: () => {
                    // this.OnFinish(obj);
                },
            });

    }
    start() {
        // [3]
        Debug.Log("AppSceneBase start");
    }
    // update (deltaTime: number) {
    //     // [4]
    // }

    RunApp() {
        Debug.Log("AppSceneBase RunApp");

    }
    InitValue() {
        Debug.Log("AppSceneBase InitValue");
        var w, h;
        // let screenSize = director.getWinSizeInPixels();//屏幕分辨率
        var framesize = view.getFrameSize();
        // fitwidth
        // this.canvasWidth = this.designWidth;
        // this.canvasHeight = framesize.height*this.canvasWidth/framesize.width;

        // this.sizeCanvas = this.canvasMain?.getComponent(UITransform)?.contentSize;
        var size = this.canvasMain?.getComponent(UITransform)?.contentSize;
        if (size != null) {
            this.sizeCanvas = size;
        }
        // let screenSize = view.getFrameSize()
        // screenSize = director.getWinSizeInPixels();
        var str = "sizeCanvas w=" + this.sizeCanvas.width + ",h=" + this.sizeCanvas.height;
        // Debug.Log("screen size width=" + screenSize.width + ",height=" + screenSize.height);
        // Debug.Log(str);




        this.textTitle.string = str;
        // this.sizeCanvas.width = screenSize.width * this.sizeCanvas.height / screenSize.height;
        // cc.Debug.Log("sizeCanvas size=" + this.sizeCanvas);
        // var framesize = cc.view.getFrameSize();
        // cc.Debug.Log("frame size=" + framesize);
        // // cc.view.setFrameSize(windowSize.width,windowSize.height);
        // // var framesize1 = cc.view.getFrameSize();
        // //  cc.Debug.Log("new frame size=" + framesize1);

        //按2048
        // w = this.canvasMain.design
        // w = view.getDesignResolutionSize().width;
        // h = view.getDesignResolutionSize().height;
        Debug.Log("DesignResolutionSize w=" + w + " h=" + h + " this.sizeCanvas=" + this.sizeCanvas);
        // w = this.btnUpRight.getComponent(UITransform).contentSize.width;
        // Debug.Log("btnUpRight pos="+this.btnUpRight.node.position+" contentSize="+w);
        // var x,y;
        // x = screenSize.width/2-w/2;
        // x = 1024;
        // x = this.sizeCanvas.width/2;
        // y = this.btnUpRight.node.position.y;
        // y = this.sizeCanvas.height/2;
        // this.btnUpRight.node.position.x=x;
        // this.btnUpRight.node.position.y=y;

        // Debug.Log("btnUpRight pos2="+this.btnUpRight.node.position+" contentSize="+w);


        // w = this.canvasMain.designResolutionSize.width;
        // h = this.canvasMain.designResolutionSize.height;

        if (Device.Main().isLandscape) {
            // view.setDesignResolutionSize(math.absMax(w,h),math.absMin(w,h),view.getResolutionPolicy());

            // this.canvasMain.fitWidth = true;
            // this.canvasMain.fitHeight = false;
        } else {
            // this.canvasMain.designResolution = new cc.size(Math.min(h, h), Math.max(w, h));
            // this.canvasMain.fitHeight = true;
            // this.canvasMain.fitWidth = false;
        }

        if (this.sizeCanvas == null) {
            return;
        }

        // tran && tran.setContentSize(this.sizeCanvas);
        // tran?.setContentSize(this.sizeCanvas); 
        // if(this.sizeCanvas!=null)
        {
            // sizeCanvas: Size | null = null;
            // tran?.setContentSize(this.sizeCanvas?.);
            let sz = this.sizeCanvas;
            this.rootNode?.getComponent(UITransform)?.setContentSize(this.sizeCanvas);
        }

        size = this.rootNode?.getComponent(UITransform)?.contentSize;
        Debug.Log("this.rootNode size=" + size);
    }



    SetRootViewController(controller: UIViewController) {

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
