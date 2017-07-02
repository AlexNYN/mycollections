	//子弹构造函数
	function Bullet(){
		this.id=Math.random()*1000000;
		this.bulletVel=5;//子弹速度
		this.element=$('<div class="bullet"></div>');		
		//添加到DOM节点中
		$(".box").append(this.element);	
	}
	
	Bullet.prototype={
			
			//初始化子弹
			init:function(){
				//设置当前子弹的left值和top值			
				this.element.css({
					left:$(".me").position().left + $(".me").width()/2 - 5 + "px",
					top:$(".me").position().top - 20 + "px"
				});
				var that=this;
				
				var timerId=setInterval(function(){
					if(that.element.position().top<-639){
						clearInterval(timerId);
						that.element.remove();//清除子弹
					}
					that.element.css({
						top:that.element.position().top-that.bulletVel+"px",
					});					
				},30);//子弹top向上移动的间隔
				return that;
			},
	};
