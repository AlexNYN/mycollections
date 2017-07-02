function Enemy(){
	this.id=Math.random()*1000000;
	//敌机一开始随机出现的位置（范围在box大盒子的宽度减去小敌机自身宽度）
	this.enemyLeft=Math.random()*430+1;
	//敌机下降速度
	this.vspeed=5;
	this.element=$('<div class="enemy"></div>');
	$(".box").append(this.element);
}

Enemy.prototype={
		init:function(){
			//console.log(this.enemyLeft);
			this.element.css({
				//随机出现的位置，在窗口范围之内
				left:this.enemyLeft+"px",
				top:"0px"
			});
			return this;
		},
		//敌机下坠
		descend:function(){
			var that=this;
			var timerId=setInterval(function(){
				//判断敌机是否出界
				if(that.element.position().top>752){
					clearInterval(timerId);
					that.element.remove();
				}
				that.element.css({
					//敌机左右摇摆暂时不写
					top:that.element.position().top+that.vspeed+"px"
				});
			},50);	
			return that;
		}
};
