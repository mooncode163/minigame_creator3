
import { _decorator, ScrollView, Prefab, Enum, EventHandler, instantiate, NodePool, Size, EventTouch, Vec2, Rect, UITransform, Node, Vec3 } from 'cc';
import { Debug } from '../../Debug';
import { UIView } from '../ViewController/UIView';
import { UIViewUtil } from '../ViewController/UIViewUtil';

const { ccclass, property, type, string } = _decorator;


// 微信小程序 const Align = LayOutUtil.Align; 会异常 所以用export enum的方式
export enum ScrollModel {
    Horizontal,//0
    Vertical,//1 
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(ScrollModel);


export enum ScrollDirection {
    None,//0
    Up,//1 
    Down,//1 
    Left,//1 
    Rigth,//1 
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(ScrollDirection);


export enum Direction {
    LEFT_TO_RIGHT__TOP_TO_BOTTOM,//0
    TOP_TO_BOTTOM__LEFT_TO_RIGHT,//1  
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(Direction);


export enum ViewType {
    Scroll,//0
    Flip,//1  
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(ViewType);
// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer


function pSub(t, e) {
    return new Vec2(t.x - e.x, t.y - e.y)
}

function quickSort(arr, cb) {
    //如果数组<=1,则直接返回
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    //找基准
    var pivot = arr[pivotIndex];
    //定义左右数组
    var left = [];
    var right = [];

    //比基准小的放在left，比基准大的放在right
    for (var i = 0; i < arr.length; i++) {
        if (i !== pivotIndex) {
            if (cb) {
                if (cb(arr[i], pivot)) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            } else {
                if (arr[i] <= pivot) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
        }
    }
    //递归
    return quickSort(left, cb).concat([pivot], quickSort(right, cb));
}

function getChildByCellIndex(parent, index) {
    for (let i = 0, c = parent.children, n = c.length; i < n; i++) {
        if (c[i]._cellIndex === index) {
            return c[i];
        }
    }
    return null;
}

@ccclass('TableView')
export class TableView extends ScrollView {
    _cellPoolCache: any[] = [];

    _cellSize: Size = new Size(0, 0);
    _lastOffset: Vec3 = new Vec3(0, 0, 0);

    // 缓存的数据
    _data = null;
    //cell的最小下标
    _minCellIndex = 0;
    //cell的最大下标
    _maxCellIndex = 0;
    _paramCount = 0;
    //一共有多少节点
    _count = 0;
    //scroll下有多少节点
    _cellCount = 0;
    //scroll一个屏幕能显示多少节点
    _showCellCount = 0;

    //GRID模式下，对cell进行分组管理
    //每组有几个节点
    _groupCellCount = null;

    _scrollDirection = ScrollDirection.None;

    _cellPool = null;
    //_view=cc.Node;//@moon 
    viewNode: Node | null = null;

    _page = 0;//当前处于那一页
    _pageTotal = 0;//总共有多少页 
    
    @type(Prefab)
    cell: Prefab | null = null;

    @type(ScrollModel)
    ScrollModel: ScrollModel = null;
    @type(ViewType)
    ViewType: ViewType = null;
    @type(Direction)
    Direction: Direction = null;
    isFill: boolean = false;
    pageChangeEvents: EventHandler[] = [];
    //@moon
    oneCellNum = 0;
    cellHeight = 0;
    uiViewParent: UIView = null;//包含tableview 的父uiview
    timeScroll = 0.5
    //@moon


    _tableView: any[] = [];

    onLoad() {
        var self = this;


        this._tableView.push(this);

        //当销毁tableView的时候，回收cell
        // var destroy = this.node.destroy;
        // this.node.destroy = function () {
        //     self.clear();
        //     destroy.call(self.node);
        // }

        // var _onPreDestroy = this.node._onPreDestroy;
        // this.node._onPreDestroy = function () {
        //     self.clear();
        //     _onPreDestroy.call(self.node);
        // }
    }
    onDestroy() {
        for (var key in this._tableView) {
            if (this._tableView[key] === this) {
                // this._tableView.splice(key);
                return;
            }
        }
    }
    //初始化cell
    _initCell(cell, reload = false) {
        if ((this.ScrollModel === ScrollModel.Horizontal && this.Direction === Direction.TOP_TO_BOTTOM__LEFT_TO_RIGHT) || (this.ScrollModel === ScrollModel.Vertical && this.Direction === Direction.LEFT_TO_RIGHT__TOP_TO_BOTTOM)) {
            var tag = cell._cellIndex * cell.childrenCount;
            for (var index = 0; index < cell.childrenCount; ++index) {
                var node = cell.children[index];
                var viewCell = node.getComponent('UIViewCell');
                if (viewCell) {
                    viewCell._cellInit_(this);
                    viewCell.init(tag + index, this._data, reload, [cell._cellIndex, index]);
                }
            }
        } else {
            if (this.ViewType === ViewType.Flip) {
                var tag = Math.floor(cell._cellIndex / this._showCellCount);
                var tagnum = tag * this._showCellCount * cell.childrenCount;
                for (var index = 0; index < cell.childrenCount; ++index) {
                    var node = cell.children[index];
                    var viewCell = node.getComponent('UIViewCell');
                    if (viewCell) {
                        viewCell._cellInit_(this);
                        viewCell.init(this._showCellCount * index + cell._cellIndex % this._showCellCount + tagnum, this._data, reload, [index + tag * cell.childrenCount, index]);
                    }
                }
            } else {
                for (var index = 0; index < cell.childrenCount; ++index) {
                    var node = cell.children[index];
                    var viewCell = node.getComponent('UIViewCell');
                    if (viewCell) {
                        viewCell._cellInit_(this);
                        viewCell.init(index * this._count + cell._cellIndex, this._data, reload, [index, index]);
                    }
                }
            }
        }
    }
    //设置cell的位置
    _setCellPosition(node, index) {
        if (this.ScrollModel === ScrollModel.Horizontal) {
            if (index === 0) {

                node.x = -UIViewUtil.GetNodeWidth(this.content) * this.content.getComponent(UITransform).anchorX + node.getComponent(UITransform).width * node.getComponent(UITransform).anchorX;
            } else {
                node.x = getChildByCellIndex(this.content, index - 1).x + node.getComponent(UITransform).width;
            }
            node.y = (node.getComponent(UITransform).anchorY - this.content.getComponent(UITransform).anchorY) * node.getComponent(UITransform).height;
        } else {
            if (index === 0) {
                node.y = UIViewUtil.GetNodeHeight(this.content) * (1 - this.content.getComponent(UITransform).anchorY) - node.getComponent(UITransform).height * (1 - node.getComponent(UITransform).anchorY);
            } else {
                node.y = getChildByCellIndex(this.content, index - 1).y - node.getComponent(UITransform).height;
            }
            node.x = (node.getComponent(UITransform).anchorX - this.content.getComponent(UITransform).anchorX) * node.getComponent(UITransform).width;
        }
    }
    _addCell(index) {
        var cell = this._getCell();
        this._setCellAttr(cell, index);
        this._setCellPosition(cell, index);
        cell.parent = this.content;
        this._initCell(cell);
    }
    _setCellAttr(cell, index) {
        cell.setSiblingIndex(index >= cell._cellIndex ? this._cellCount : 0);
        cell._cellIndex = index;
    }
    _addCellsToView() {
        for (var index = 0; index <= this._maxCellIndex; ++index) {
            this._addCell(index);
        }
    }
    _getCell() {
        if (this._cellPool.size() === 0) {
            var cell = instantiate(this.cell);

            var node = new Node();
            node.addComponent(UITransform);
            // node.anchorX = 0.5;
            // node.anchorY = 0.5;
            //@moon  
            // var layout = node.addComponent(cc.Layout);

            // if (this.ScrollModel === ScrollModel.Horizontal) {
            //     layout.type = cc.Layout.Type.VERTICAL;
            // } else {
            //     layout.type = cc.Layout.Type.HORIZONTAL;
            // }
            // //CHILDREN 均分排列 CONTAINER 居中排列
            // layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
            // layout.horizontalDirection = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
            //@moon
            var length = 0;
            if (this.ScrollModel === ScrollModel.Horizontal) {
                node.getComponent(UITransform).width = cell.getComponent(UITransform).width;
                node.getComponent(UITransform).height = UIViewUtil.GetNodeHeight(this.content);


                var childrenCount = Math.floor((UIViewUtil.GetNodeHeight(this.content)) / (cell.getComponent(UITransform).height));
                //@moon
                if (this.oneCellNum != 0) {
                    // childrenCount = this.oneCellNum;
                }

                if (this.cellHeight != 0) {
                    node.getComponent(UITransform).width = this.cellHeight;
                }
                //@moon


                for (var index = 0; index < childrenCount; ++index) {
                    if (!cell) {
                        cell = instantiate(this.cell);
                    }

                    cell.parent = node;
                    //@moon
                    var w_item, h_item;
                    w_item = node.getComponent(UITransform).width;
                    h_item = Math.floor(UIViewUtil.GetNodeHeight(this.content) / childrenCount);
                    UIView.SetNodeContentSize(cell, w_item, h_item)
                    Debug.Log("cell w_item=" + w_item + " h_item=" + h_item);

                    //@moon


                    // cell.x = (cell.getComponent(UITransform).anchorX - 0.5) * cell.getComponent(UITransform).width;
                    // cell.y = node.getComponent(UITransform).height / 2 - cell.getComponent(UITransform).height * (1 - cell.getComponent(UITransform).anchorY) - length;
                    var pt = cell.getPosition();
                    pt.x = (cell.getComponent(UITransform).anchorX - 0.5) * cell.getComponent(UITransform).width;
                    pt.y = node.getComponent(UITransform).height / 2 - cell.getComponent(UITransform).height * (1 - cell.getComponent(UITransform).anchorY) - length;
                    cell.setPosition(pt);
                    Debug.Log("cell pt=" + pt);
                    length += cell.getComponent(UITransform).height;


                    cell = null;
                }
            } else {
                node.getComponent(UITransform).height = cell.getComponent(UITransform).height;
                var childrenCount = Math.floor((UIViewUtil.GetNodeWidth(this.content)) / (cell.getComponent(UITransform).width));
                //@moon
                if (this.oneCellNum != 0) {
                    // childrenCount = this.oneCellNum;
                }
                if (this.cellHeight != 0) {
                    node.getComponent(UITransform).height = this.cellHeight;
                }
                //@moon


                node.getComponent(UITransform).width = UIViewUtil.GetNodeWidth(this.content);


                for (var index = 0; index < childrenCount; index++) {
                    if (!cell) {
                        cell = instantiate(this.cell);
                    }

                    cell.parent = node;

                    //@moon
                    var w_item, h_item;
                    w_item = Math.floor(UIViewUtil.GetNodeWidth(this.content) / childrenCount);
                    h_item = node.getComponent(UITransform).height;
                    UIView.SetNodeContentSize(cell, w_item, h_item);
                    Debug.Log("cell w_item=" + w_item + " h_item" + h_item);
                    // var rctran = cell.getComponent(cc.RectTransform);
                    // if (rctran != null) {
                    //     rctran.LayOut();
                    // }

                    // cell.y = (cell.getComponent(UITransform).anchorY - 0.5) * cell.getComponent(UITransform).height;
                    // cell.x = -node.getComponent(UITransform).width / 2 + cell.getComponent(UITransform).width * cell.getComponent(UITransform).anchorX + length;
                    var pt = cell.getPosition();
                    // pt.y = (cell.getComponent(UITransform).anchorY - 0.5) * cell.getComponent(UITransform).height;
                    pt.y = index* cell.getComponent(UITransform).height;
                    pt.x = -node.getComponent(UITransform).width / 2 + cell.getComponent(UITransform).width * cell.getComponent(UITransform).anchorX + length;
                    Debug.Log("cell pt=" + pt+" index="+index);
                    cell.setPosition(pt);
                    length += cell.getComponent(UITransform).width;

                    //@moon

                    cell = null;


                }
            }
            this._cellPool.put(node);
        }
        var table_cell = this._cellPool.get();
        //@moon 
        table_cell.uiViewParent = this.uiViewParent;
        //@moon
        return table_cell;
    }
    _getCellSize() {
        var cell = this._getCell();
        // var cellSize = cell.getContentSize();
        var cellSize = UIViewUtil.GetNodeContentSize(cell);
        this._cellPool.put(cell);
        return cellSize;
    }
    _getGroupCellCount() {
        var cell = this._getCell();
        var groupCellCount = cell.childrenCount;
        this._cellPool.put(cell);
        return groupCellCount;
    }
    clear() {
        for (var index = this.content.children.length - 1; index >= 0; --index) {
            this._cellPool.put(this.content.children[index]);
        }
        this._cellCount = 0;
        this._showCellCount = 0;
    }
    reload(data) {
        if (data !== undefined) {
            this._data = data;
        }
        for (var index = this.content.children.length - 1; index >= 0; --index) {
            this._initCell(this.content.children[index], true);
        }
    }
    _getCellPoolCacheName() {
        if (this.ScrollModel === ScrollModel.Horizontal) {
            return this.cell.name + 'h' + UIViewUtil.GetNodeHeight(this.content);
        } else {
            return this.cell.name + 'w' + UIViewUtil.GetNodeWidth(this.content);
        }
    }
 
    _initTableView() {
        if (this._cellPool) {
            this.clear();
        }
       
        var name = this._getCellPoolCacheName();
        if (!this._cellPoolCache[name]) {
            this._cellPoolCache[name] = new NodePool('UIViewCell');
        }
        this._cellPool = this._cellPoolCache[name];
        // return;
        this._cellSize = this._getCellSize();
        // return;
        this._groupCellCount = this._getGroupCellCount();

        this._count = Math.ceil(this._paramCount / this._groupCellCount);
       
        // return;
        if (this.ScrollModel === ScrollModel.Horizontal) {
            this.viewNode.getComponent(UITransform).width = this.node.getComponent(UITransform).width;
            //  this.viewNode.x = (this.viewNode.getComponent(UITransform).anchorX - this.node.getComponent(UITransform).anchorX) * this.viewNode.getComponent(UITransform).width;

            this._cellCount = Math.ceil(this.viewNode.getComponent(UITransform).width / this._cellSize.width) + 1;
            if (this.ViewType === ViewType.Flip) {
                if (this._cellCount > this._count) {
                    if (this.isFill) {
                        this._cellCount = Math.floor(this.viewNode.getComponent(UITransform).width / this._cellSize.width);
                    } else {
                        this._cellCount = this._count;
                    }
                    this._showCellCount = this._cellCount;
                    this._pageTotal = 1;
                } else {
                    this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
                    this._count = this._pageTotal * (this._cellCount - 1);
                    this._showCellCount = this._cellCount - 1;
                }
            } else {
                if (this._cellCount > this._count) {
                    if (this.isFill) {
                        this._cellCount = Math.floor(this.viewNode.getComponent(UITransform).width / this._cellSize.width);
                    } else {
                        this._cellCount = this._count;
                    }
                    this._showCellCount = this._cellCount;
                } else {
                    this._showCellCount = this._cellCount - 1;
                }
            }

            this.content.getComponent(UITransform).width = this._count * this._cellSize.width;
            // if (UIViewUtil.GetNodeWidth(this.content) <= this.viewNode.width) {
            //     UIViewUtil.GetNodeWidth(this.content) = this.viewNode.width + 1;
            // }

            //停止_scrollView滚动
            this.stopAutoScroll();
            this.scrollToLeft(this.timeScroll, true);
        } else {

            
            this.viewNode.getComponent(UITransform).height = this.node.getComponent(UITransform).height;
            var y = (this.viewNode.getComponent(UITransform).anchorY - this.node.getComponent(UITransform).anchorY) * this.viewNode.getComponent(UITransform).height;
            var pt = this.viewNode.getPosition();
            pt.y = y;
            this.viewNode.setPosition(pt);

            this._cellCount = Math.ceil(this.viewNode.getComponent(UITransform).height / this._cellSize.height) + 1;
            if (this.ViewType === ViewType.Flip) {
                if (this._cellCount > this._count) {
                    if (this.isFill) {
                        this._cellCount = Math.floor(this.viewNode.getComponent(UITransform).height / this._cellSize.height);
                    } else {
                        this._cellCount = this._count;
                    }
                    this._showCellCount = this._cellCount;
                    this._pageTotal = 1;
                } else {
                    this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
                    this._count = this._pageTotal * (this._cellCount - 1);
                    this._showCellCount = this._cellCount - 1;
                }
            } else {
                if (this._cellCount > this._count) {
                    if (this.isFill) {
                        this._cellCount = Math.floor(this.viewNode.getComponent(UITransform).height / this._cellSize.height);
                    } else {
                        this._cellCount = this._count;
                    }
                    this._showCellCount = this._cellCount;
                } else {
                    this._showCellCount = this._cellCount - 1;
                }
            }

            this.content.getComponent(UITransform).height = this._count * this._cellSize.height;
         

            //停止_scrollView滚动
            this.stopAutoScroll();
            this.scrollToTop(this.timeScroll, true);
             
        }

        this._changePageNum(1 - this._page);

        this._lastOffset = this.getScrollOffset();
        this._minCellIndex = 0;
        this._maxCellIndex = this._cellCount - 1;

        this._addCellsToView();
        
    }
    //count:cell的总个数  data:要向cell传递的数据
    initTableView(paramCount, data) {
        this._paramCount = paramCount;
        this._data = data;

        if (this.ScrollModel === ScrollModel.Horizontal) {
            this.horizontal = true;
            this.vertical = false;
        } else {
            this.vertical = true;
            this.horizontal = false;
        }
        // @moon ng
        this.viewNode = this.content.parent;

        //为scrollBar添加size改变的监听
        // this.verticalScrollBar && this.verticalScrollBar.node.on('size-changed', function () {
        //     this._updateScrollBar(this._getHowMuchOutOfBoundary());
        // } this);
        // this.horizontalScrollBar && this.horizontalScrollBar.node.on('size-changed', function () {
        //     this._updateScrollBar(this._getHowMuchOutOfBoundary());
        // } this);
        // if (this.node.getComponent(cc.Widget)) {
        //     this.node.getComponent(cc.Widget).updateAlignment();
        // }


        //@moon
        //this._initTableView();
        //等等tableview 大小调整完成
        this.scheduleOnce(this._initTableView, 0.001);
        //@moon

    }
    //*************************************************重写ScrollView方法*************************************************//
    // touch event handler 

    _onTouchBegan(event, captureListeners) {
        super._onTouchBegan(event, captureListeners);
        Debug.Log("TableView _onTouchBegan");
        this._touchstart(event);
    }

    _onTouchMoved(event, captureListeners) {
        Debug.Log("TableView _onTouchMoved 0");
        // super._onTouchMoved(event, captureListeners);
        // if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        let touch = event.touch;
        if (this.content) {
            this._handleMoveLogic(touch);
        }
        // Do not prevent touch events in inner nodes
        if (!this.cancelInnerEvents) {
            return;
        }

        let deltaMove = pSub(touch.getLocation(), touch.getStartLocation());
        //FIXME: touch move delta should be calculated by DPI.
        // if (deltaMove.mag() > 7) {
        //     if (!this._touchMoved && event.target !== this.node) {
        //         Simulate touch cancel for target node
        //         let cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
        //         cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
        //         cancelEvent.touch = event.touch;
        //         cancelEvent.simulate = true; 
        //         event.target.emit(cc.Node.EventType.TOUCH_CANCEL, cancelEvent);
        //         this._touchMoved = true;
        //     }
        // }
        this._stopPropagationIfTargetIsMe(event);
        Debug.Log("TableView _onTouchMoved _touchmove");
        this._touchmove(event);
    }

    _onTouchEnded(event, captureListeners) {
        super._onTouchEnded(event, captureListeners);
        Debug.Log("TableView _onTouchEnded");
        this._touchend(event);
    }
    _onTouchCancelled(event, captureListeners) {
        super._onTouchEnded(event, captureListeners);
        this._touchend(event);
    }
    stopAutoScroll() {
        this._scrollDirection = ScrollDirection.None;
        super.stopAutoScroll();
    }
    scrollToBottom(timeInSecond, attenuated) {
        this._scrollDirection = ScrollDirection.Up;
        super.scrollToBottom(timeInSecond, attenuated);

    }
    scrollToTop(timeInSecond, attenuated) {
        this._scrollDirection = ScrollDirection.Down;
        super.scrollToTop(timeInSecond, attenuated);
    }
    scrollToLeft(timeInSecond, attenuated) {
        this._scrollDirection = ScrollDirection.Rigth;
        super.scrollToLeft(timeInSecond, attenuated);
    }
    scrollToRight(timeInSecond, attenuated) {
        this._scrollDirection = ScrollDirection.Left;
        super.scrollToRight(timeInSecond, attenuated);
    }
    scrollToOffset(offset, timeInSecond, attenuated) {
        var nowoffset = this.getScrollOffset();
        var p = pSub(offset, nowoffset);
        if (this.ScrollModel === ScrollModel.Horizontal) {
            if (p.x > 0) {
                this._scrollDirection = ScrollDirection.Left;
            } else if (p.x < 0) {
                this._scrollDirection = ScrollDirection.Rigth;
            }
        } else {
            if (p.y > 0) {
                this._scrollDirection = ScrollDirection.Up;
            } else if (p.y < 0) {
                this._scrollDirection = ScrollDirection.Down;
            }
        }

        super.scrollToOffset(offset, timeInSecond, attenuated);
    }
    //*******************************************************END*********************************************************//

    addScrollEvent(target, component, handler) {
        // var eventHandler = new cc.Component.EventHandler();
        // eventHandler.target = target;
        // eventHandler.component = component;
        // eventHandler.handler = handler;
        // this.scrollEvents.push(eventHandler);
    }
    removeScrollEvent(target) {
        // for (var key in this.scrollEvents) {
        //     var eventHandler = this.scrollEvents[key]
        //     if (eventHandler.target === target) {
        //         this.scrollEvents.splice(key, 1);
        //         return;
        //     }
        // }
    }
    clearScrollEvent() {
        this.scrollEvents = [];
    }
    addPageEvent(target, component, handler) {
        // var eventHandler = new Component.EventHandler();
        // eventHandler.target = target;
        // eventHandler.component = component;
        // eventHandler.handler = handler;
        // this.pageChangeEvents.push(eventHandler);
    }
    removePageEvent(target) {
        for (var key = 0; key < this.pageChangeEvents.length; key++) {
            var eventHandler = this.pageChangeEvents[key]
            if (eventHandler.target === target) {
                this.pageChangeEvents.splice(key, 1);
                return;
            }
        }
    }
    clearPageEvent() {
        this.pageChangeEvents = [];
    }
    scrollToNextPage() {
        this.scrollToPage(this._page + 1);
    }
    scrollToLastPage() {
        this.scrollToPage(this._page - 1);
    }
    scrollToPage(page) {
        if (this.ViewType !== ViewType.Flip || page === this._page) {
            return;
        }

        if (page < 1 || page > this._pageTotal) {
            return;
        }

        var time = 0.3 * Math.abs(page - this._page);

        this._changePageNum(page - this._page);

        var x = this.viewNode.getComponent(UITransform).width;
        var y = this.viewNode.getComponent(UITransform).height;
        x = (this._page - 1) * x;
        y = (this._page - 1) * y;
        this.scrollToOffset(new Vec3(x, y, 0), time, true);
    }
    getCells(callback) {
        var cells = [];
        var nodes = quickSort(this.content.children, function (a, b) {
            return a._cellIndex < b._cellIndex;
        });
        for (var key in nodes) {
            var node = nodes[key];
            for (var k in node.children) {
                cells.push(node.children[k]);
            }
        }
        callback(cells);
    }
    getData() {
        return this._data;
    }
    getGroupsRange(callback) {
        var arr = [];
        for (var i = this._minCellIndex; i <= this._maxCellIndex; i++) {
            arr.push(i);
        }
        callback(arr);
    }
    _changePageNum(num) {
        this._page += num;

        if (this._page <= 0) {
            this._page = 1;
        } else if (this._page > this._pageTotal) {
            this._page = this._pageTotal;
        }

        for (var key = 0; key < this.pageChangeEvents.length; key++) {
            var event = this.pageChangeEvents[key];
            event.emit([this._page, this._pageTotal]);
        }
    }
    _touchstart(event) {
        if (this.ScrollModel === ScrollModel.Horizontal) {
            this.horizontal = false;
        } else {
            this.vertical = false;
        }
    }
    _touchmove(event) {
        if (this.horizontal === this.vertical) {
            var startL = event.getStartLocation();
            var l = event.getLocation();
            if (this.ScrollModel === ScrollModel.Horizontal) {
                if (Math.abs(l.x - startL.x) <= 7) {
                    return;
                }
            } else {
                if (Math.abs(l.y - startL.y) <= 7) {
                    return;
                }
            }

            if (this.ScrollModel === ScrollModel.Horizontal) {
                this.horizontal = true;
            } else {
                this.vertical = true;
            }
        }
    }
    _touchend(event) {
        if (this.ScrollModel === ScrollModel.Horizontal) {
            this.horizontal = true;
        } else {
            this.vertical = true;
        }

        if (this.ViewType === ViewType.Flip && this._pageTotal > 1) {
            this._pageMove(event);
        }

        // this._ckickCell(event);
    }
    // _ckickCell (event) {
    //     var srartp = event.getStartLocation();
    //     var p = event.getLocation();

    //     if (this.ScrollModel === ScrollModel.Horizontal) {
    //         if (Math.abs(p.x - srartp.x) > 7) {
    //             return;
    //         }
    //     } else {
    //         if (Math.abs(p.y - srartp.y) > 7) {
    //             return;
    //         }
    //     }

    //     var convertp = this.content.convertToNodeSpaceAR(p);
    //     for (var key in this.content.children) {
    //         var node = this.content.children[key];
    //         var nodebox = node.getBoundingBox();
    //         if (nodebox.contains(convertp)) {
    //             convertp = node.convertToNodeSpaceAR(p);
    //             for (var k in node.children) {
    //                 var cell = node.children[k]
    //                 var cellbox = cell.getBoundingBox();
    //                 if (cellbox.contains(convertp)) {
    //                     if (cell.activeInHierarchy && cell.opacity !== 0) {
    //                         cell.clicked();
    //                     }
    //                     return;
    //                 }
    //             }
    //             return;
    //         }
    //     }
    // }
    //移动距离小于25%则不翻页
    _pageMove(event) {
        var x = this.viewNode.getComponent(UITransform).width;
        var y = this.viewNode.getComponent(UITransform).height;

        if (this.ViewType === ViewType.Flip) {
            var offset = this.getScrollOffset();
            var offsetMax = this.getMaxScrollOffset();

            if (this.ScrollModel === ScrollModel.Horizontal) {
                if (offset.x >= 0 || offset.x <= -offsetMax.x) {
                    return;
                }
                y = 0;
                if (Math.abs(event.getLocation().x - event.getStartLocation().x) > this.viewNode.getComponent(UITransform).width / 4) {
                    if (this._scrollDirection === ScrollDirection.Left) {
                        if (this._page < this._pageTotal) {
                            this._changePageNum(1);
                        } else {
                            return;
                        }
                    } else if (this._scrollDirection === ScrollDirection.Rigth) {
                        if (this._page > 1) {
                            this._changePageNum(-1);
                        } else {
                            return;
                        }
                    }
                }
            } else {
                if (offset.y >= offsetMax.y || offset.y <= 0) {
                    return;
                }
                x = 0;
                if (Math.abs(event.getLocation().y - event.getStartLocation().y) > this.viewNode.getComponent(UITransform).height / 4) {
                    if (this._scrollDirection === ScrollDirection.Up) {
                        if (this._page < this._pageTotal) {
                            this._changePageNum(1);
                        } else {
                            return;
                        }
                    } else if (this._scrollDirection === ScrollDirection.Down) {
                        if (this._page > 1) {
                            this._changePageNum(-1);
                        } else {
                            return;
                        }
                    }
                }
            }

            x = (this._page - 1) * x;
            y = (this._page - 1) * y;

            this.scrollToOffset(new Vec3(x, y, 0), 0.3, true);
        }
    }
    _getBoundingBoxToWorld(node) {
        var p = node.convertToWorldSpace(new Vec2(0, 0));//p
        return new Rect(p.x, p.y, node.width, node.getComponent(UITransform).height);
    }
    _updateCells() {
        if (this.ScrollModel === ScrollModel.Horizontal) {
            if (this._scrollDirection === ScrollDirection.Left) {
                if (this._maxCellIndex < this._count - 1) {
                    var viewBox = this._getBoundingBoxToWorld(this.viewNode);
                    do {
                        var node = getChildByCellIndex(this.content, this._minCellIndex);
                        var nodeBox = this._getBoundingBoxToWorld(node);

                        if (nodeBox.xMax <= viewBox.xMin) {
                            node.x = getChildByCellIndex(this.content, this._maxCellIndex).x + node.width;
                            this._minCellIndex++;
                            this._maxCellIndex++;
                            if (nodeBox.xMax + (this._maxCellIndex - this._minCellIndex + 1) * node.width > viewBox.xMin) {
                                this._setCellAttr(node, this._maxCellIndex);
                                this._initCell(node);
                            }
                        } else {
                            break;
                        }
                    } while (this._maxCellIndex !== this._count - 1);
                }

            } else if (this._scrollDirection === ScrollDirection.Rigth) {
                if (this._minCellIndex > 0) {
                    var viewBox = this._getBoundingBoxToWorld(this.viewNode);
                    do {
                        var node = getChildByCellIndex(this.content, this._maxCellIndex);
                        var nodeBox = this._getBoundingBoxToWorld(node);

                        if (nodeBox.xMin >= viewBox.xMax) {
                            node.x = getChildByCellIndex(this.content, this._minCellIndex).x - node.width;
                            this._minCellIndex--;
                            this._maxCellIndex--;
                            if (nodeBox.xMin - (this._maxCellIndex - this._minCellIndex + 1) * node.width < viewBox.xMax) {
                                this._setCellAttr(node, this._minCellIndex);
                                this._initCell(node);
                            }
                        } else {
                            break;
                        }
                    } while (this._minCellIndex !== 0);
                }
            }
        } else {
            if (this._scrollDirection === ScrollDirection.Up) {
                if (this._maxCellIndex < this._count - 1) {
                    var viewBox = this._getBoundingBoxToWorld(this.viewNode);
                    do {
                        var node = getChildByCellIndex(this.content, this._minCellIndex);
                        var nodeBox = this._getBoundingBoxToWorld(node);

                        if (nodeBox.yMin >= viewBox.yMax) {
                            node.y = getChildByCellIndex(this.content, this._maxCellIndex).y - node.getComponent(UITransform).height;
                            this._minCellIndex++;
                            this._maxCellIndex++;
                            if (nodeBox.yMin - (this._maxCellIndex - this._minCellIndex + 1) * node.getComponent(UITransform).height < viewBox.yMax) {
                                this._setCellAttr(node, this._maxCellIndex);
                                this._initCell(node);
                            }
                        } else {
                            break;
                        }
                    } while (this._maxCellIndex !== this._count - 1);
                }
            } else if (this._scrollDirection === ScrollDirection.Down) {
                if (this._minCellIndex > 0) {
                    var viewBox = this._getBoundingBoxToWorld(this.viewNode);
                    do {
                        var node = getChildByCellIndex(this.content, this._maxCellIndex);
                        var nodeBox = this._getBoundingBoxToWorld(node);

                        if (nodeBox.yMax <= viewBox.yMin) {
                            node.y = getChildByCellIndex(this.content, this._minCellIndex).y + node.getComponent(UITransform).height;
                            this._minCellIndex--;
                            this._maxCellIndex--;
                            if (nodeBox.yMax + (this._maxCellIndex - this._minCellIndex + 1) * node.getComponent(UITransform).width > viewBox.yMin) {
                                this._setCellAttr(node, this._minCellIndex);
                                this._initCell(node);
                            }
                        } else {
                            break;
                        }
                    } while (this._minCellIndex !== 0);

                }
            }
        }
    }
    _getScrollDirection() {
        var offset = this.getScrollOffset();

        var lastOffset = this._lastOffset;
        this._lastOffset = offset;
        var pt = pSub(offset, lastOffset);
        offset = new Vec3(pt.x, pt.y, 0);
        if (this.ScrollModel === ScrollModel.Horizontal) {
            if (offset.x > 0) {
                this._scrollDirection = ScrollDirection.Rigth;
            } else if (offset.x < 0) {
                this._scrollDirection = ScrollDirection.Left;
            } else {
                this._scrollDirection = ScrollDirection.None;
            }
        } else {
            if (offset.y < 0) {

                this._scrollDirection = ScrollDirection.Down;
            } else if (offset.y > 0) {
                this._scrollDirection = ScrollDirection.Up;
            } else {
                this._scrollDirection = ScrollDirection.None;
            }
        }
    }

    update(deltaTime: number) {
        // this._super(dt);

        if (this._cellCount === this._showCellCount || this._pageTotal === 1) {
            return;
        }
        this._getScrollDirection();
        this._updateCells();
    }

    //@moon
    UpdateSize(size) {
        UIView.SetNodeContentSize(this.node, size.width, size.height);
        UIView.SetNodeContentSize(this.content, size.width, size.height);
        UIView.SetNodeContentSize(this.viewNode, size.width, size.height);
    }

    // reload() {
    //     for (var key in tableView._tableView) {
    //         tableView._tableView[key].reload();
    //     }
    // }
    // clear() {
    //     for (var key in tableView._tableView) {
    //         tableView._tableView[key].clear();
    //     }
    // }

    start() {
        // @moon 
        this.viewNode = this.content.parent;

        // var rctran = this.node.getComponent(cc.RectTransform);
        // if (rctran != null) {
        //     var size = cc.size(rctran.width, rctran.height);
        //     this.UpdateSize(size);
        // }

    }
    //@moon


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
