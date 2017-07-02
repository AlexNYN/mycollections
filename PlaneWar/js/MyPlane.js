	//我方飞机
	function MyPlane(){
		this._top=10;
		this._left=10;
		this.element=$('<div class="me"></div>');
		$(".box").append(this.element);
	}
	MyPlane.prototype={
			init:function(){
				return this;
			},
	};