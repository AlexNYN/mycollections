	$(function(){
		//初始化页面
		$start=$(".start");//开始游戏按钮
		//开场动画，小飞机飞过
		new TinyPlane().init().move();
		//子弹数组
		bulletArray=[];
		//敌机数组
		enemyArray=[];
		//点击开始游戏
		$start.on("click",function(){
			//清除LOGO
			$(".logo").remove();
			$(".start").remove();
			$(".load-plane").remove();
			
			//创建子弹
			createBullet();			
			//创建敌机
			createEnemy();
			//判断是否碰撞
			isCollided();
			
			$(document).keydown(function(e){
				var evt=e||window.event;
				//判断上下左右
				switch (evt.which){
					//上
					case 38:
					//alert(1);
					$(".me").css({
						"top":$(".me").position().top-myPlane._topSpeed+"px"
					});
					break;
					//下
					case 40:
					$(".me").css({
						"top":$(".me").position().top+myPlane._topSpeed+"px"
					});
						break;
					//左
					case 37:
					$(".me").css({
						"left":$(".me").position().left-myPlane._leftSpeed+"px"
					});
						break;
					//右
					case 39:
					$(".me").css({
						"left":$(".me").position().left+myPlane._leftSpeed+"px"
					});
						break;
				}
				//判断我方飞机是否出界
				if($(".me").position().left<0){
					$(".me").css("left","0px");
				}else if($(".me").position().left>380){
					$(".me").css("left","380px");
				}
				if($(".me").position().top<-4.975){
					$(".me").css("top","4.975px");
				}else if($(".me").position().top>625){
					$(".me").css("top","625px");
				}
				
			});
		});
		
	});
	
	//创建玩家飞机
	var myPlane={
		_topSpeed:10,//飞机上升速度
		_leftSpeed:10//左移速度
	};
	
	//创建子弹实例
	function createBullet(){
		//setInterval(function(){
			bulletArray.push(new Bullet().init());
		//},500);				
	}
	//创建敌机
	function createEnemy(){
		//setInterval(function(){
			enemyArray.push(new Enemy().init().descend());
		//},1000);		
	}
	//判断碰撞
	function isCollided(){
		setInterval(function(){
			for (var i = 0; i < bulletArray.length; i++) {
				for (var j = 0; j < enemyArray.length; j++) {
					console.log(bulletArray[i].element.position().top);
					//console.log(enemyArray[j].element.position().top);
					
/*					if(bulletArray[i].element.position().left>=enemyArray[j].element.position().left
					&& bulletArray[i].element.position().left<=enemyArray[j].element.position().left+50
					&& bulletArray[i].element.position().top==enemyArray[j].element.position().top-50){
						alert(1);
					}*/
				}
			}			
		},500);
	}
