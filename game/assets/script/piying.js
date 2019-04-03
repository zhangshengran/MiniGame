// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        //加速度
        accel:0,
        leftHand: {
            default: null,
            type: cc.Node
        },
        rightHand: {
            default: null,
            type: cc.Node
        }
    },

    setJumpAction: function () {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
       
        
        return cc.sequence(jumpUp, jumpDown);
    },
    turnRound:function(){
        var flipXAction = cc.flipX(true);
        
    },
    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:  
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
             case cc.macro.KEY.j: 
            {
                this.node.runAction(this.jumpAction);
                break;
            } 
        }
    },
    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            {
                this.accLeft = false;
                var timer = setInterval(()=>{
                    this.xSpeed += 150;
                     if(this.xSpeed>0){
                        clearInterval(timer);
                        this.xSpeed=0;
                     }
                        
                    },100)
                // this.xSpeed = 0;
                // cc.log(this.accLeft)
                break;
            }
               
            case cc.macro.KEY.d:
            {
                this.accRight = false;
                var timer = setInterval(()=>{
                    this.xSpeed -= 150;
                     if(this.xSpeed<0){
                        clearInterval(timer);
                        this.xSpeed=0;
                     }
                        
                    },100)
                // this.xSpeed = 0;
                // cc.log(this.xSpeed)
                // cc.log(this.accLeft)
                break;
            }
            case cc.macro.KEY.j: 
            {
                break;
            } 
        }
    },


    update: function (dt) {
         // 根据当前加速度方向每帧更新速度
         if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
    },

    onLoad: function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

         // 加速度方向开关
         this.accLeft = false;
         this.accRight = false;
         // 主角当前水平方向速度
         this.xSpeed = 0;

          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
          cc.log(this.xSpeed);
          this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
                
                console.log(event.getDelta())//获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性
                this.node.x +=event.getDelta().x
                this.node.y +=event.getDelta().y//代码需改进
                this.node.rotation+=event.getDelta().y;//控制旋转
                event.stopPropagation();
          },this)

     
     
    },
    
        
       
    //     // this.node.runAction(cc.rotateBy(0.1,Number(pos.x).toString()[0]));
    //     // this.node.x=pos.x;
    
    // },
  

    start () {

    },

    // update (dt) {},
});
