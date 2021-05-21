// import { debug  } from 'cocos_core_platform_debug';
import { _decorator, Component, Node, Canvas, View, Size, director, size, view, math, UITransform, Button, Vec2, Label, setDisplayStats } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;
import { UIViewController } from "../../Common/UIKit/ViewController/UIViewController";
import { LoadItemInfo } from "./LoadItemInfo";
import { Debug } from '../../Common/Debug';
import { Device } from '../../Common/Device';
import { AppPreLoad } from '../../Common/AppPreLoad';
import { AudioPlay } from '../../Common/Audio/AudioPlay';
import { Config } from '../../Common/Config/Config';
import { CloudResPreLoad } from '../../Common/CloundRes/CloudResPreLoad';


// typescript 提示 Object is possibly ‘null‘ 的N种解决方法
// https://blog.csdn.net/iamlujingtao/article/details/110573421


// 设计分辨率 editor project settings -> project data : Design Width = 1536  Design Height = 2048  Fit Width 勾选  Fit Height 不勾选 
@ccclass('AppSceneBase')
export class AppSceneBase extends Component {
    static _main: AppSceneBase;
    //静态方法
    static get main() {
        if (this._main == null) {

        }
        return this._main;
    }

    rootViewController: UIViewController | null = null;

    @type(Canvas) // Declare that the cc type of the attribute _targetNode is Node
    canvasMain: Canvas | null = null;

    @type(Node)
    rootNode: Node | null = null;


    // @type(Size)
    sizeCanvas: Size | null = null;

    // designWidth=960;
    // designHeight=480;

    // canvasWidth=0;
    // canvasHeight=0;


    isHasRunApp = false;

    onLoad() {
        // [3]
        AppSceneBase._main = this;
        Debug.Log("AppSceneBase onLoad");
        this.isHasRunApp = false; 

        // 关闭左下角的fps和调试信息
        setDisplayStats(false);  
        
        this.InitValue();

        //component
        this.node.addComponent(AudioPlay);

        // AppPreLoad.main.Load(
        //     {
        //         success: (p: any) => {
        //             this.RunApp();
        //         },
        //         fail: (p: any) => {
        //             // this.OnFinish(obj);
        //             this.RunApp();
        //         },
        //     });


            CloudResPreLoad.main.Load(
            {
                success: (p: any) => {
                    this.RunApp();
                },
                fail: (p: any) => {
                    // this.OnFinish(obj);
                    this.RunApp();
                },
            });
 
 
        // this.RunApp();
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
        let frameSize = view.getFrameSize()
        let screenSize = director.getWinSizeInPixels();
        var str = "sizeCanvas w=" + this.sizeCanvas.width + ",h=" + this.sizeCanvas.height;
        Debug.Log("screen size width=" + screenSize.width + ",height=" + screenSize.height);
        // Debug.Log(str);




        // this.textTitle.string = str;
        // this.sizeCanvas.width = screenSize.width * this.sizeCanvas.height / screenSize.height;
        // Debug.Log("sizeCanvas size=" + this.sizeCanvas);
        // var framesize = cc.view.getFrameSize();
        // Debug.Log("frame size=" + framesize);
        // // cc.view.setFrameSize(windowSize.width,windowSize.height);
        // // var framesize1 = cc.view.getFrameSize();
        // //  Debug.Log("new frame size=" + framesize1);

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

        if (Device.main.isLandscape) {
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

    LayOut() {
        if (this.rootViewController != null) {
            this.rootViewController.LayOut();
            var ui = this.rootViewController.view;
            if (ui != null) {
                ui.LayOut();
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

 

