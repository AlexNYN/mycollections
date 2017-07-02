	//过场动画小飞机构造函数
	function TinyPlane(){
		
		this.hspeed=Math.random()*20+1;
		
		//每个小飞机随机的top值
		this.tops=Math.random()*700+1;
		
		this.element=$("<img src='img/loading2.png' class='load-plane'/>");
		
		$(".loading-entrance").append(this.element);
	}
	TinyPlane.prototype={
			init:function(){
				this.element.css({
					"top":this.tops
				});
				return this;
			},
			move:function(){
				var that=this;
				var timerId=setInterval(function(){
					//判断小飞机是否出界
					if(that.element.position().left>$(".box").width()){
						clearInterval(timerId);
						that.element.remove();//清除开场小飞机
					}
					that.element.css({
						"left":that.element.position().left+that.hspeed+"px",
					});					
				},20);				
			},
	};	