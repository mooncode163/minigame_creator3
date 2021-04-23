 
    /**
     *author     : NaiKing
     *description: 
     */
    export class TestCallAndThis {
        /**
         * 不推荐的回调写法
         * 外部调用必须【必须】【必须】在回调参数方法后面添加.bind(this),
         * 否则可能会this异常
         */
        public static callBackTest(arg:number,callBack:Function):void
        {
            //返回 2 x arg
            let result:number=arg*2;
            //不推荐直接调用回调方法，应使用callBack.call(caller,result);
            callBack(result);
        }
        /**
         * 推荐的回调写法
         * @param arg 参数
         * @param caller 调用域 
         * @param method 指定的回调方法（兼容.bind(this) 也可以不加.bind(this) ）
         */
        public static callMethod(arg:number,caller:any,method:Function):void
        {
            //返回 2 x arg
            let result:number=arg*2;
            //推荐的做法 .call(caller,result);
            method.call(caller,result);
           
        }
    }
 