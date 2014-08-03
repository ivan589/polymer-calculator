
Polymer({
	numbers: 	[7,8,9,4,5,6,1,2,3],
	operations: ['=','+','-','x','÷','√','C'],

	number1: 0,
	number2: 0,

	clear: true,

	theme: 'light',
	
	monitor		: '0',
	operation	: '',

	ready: function(){
		 document.querySelector('web-calculator').addEventListener('btn-tap', this.handleButtonTap);
	},

	handleButtonTap: function(e){
		var btn = e.detail.btn;

		if(isNaN(btn)){
			this.handleOperation(btn);
		}else{
			this.handleNumber(btn);
		}
	},

	handleNumber: function(n){
		if(this.clear){
			this.updateMonitor(n);
		}else{
			this.appendMonitor(n);
		}

		this.number2 = Number(this.monitor);
	},

	handleOperation: function(o){

		//switch operations
		this.monitor = this.number1 + this.number2;



		this.number1 = this.monitor;
		this.operation = o;
		this.clear = true;
	},

	updateMonitor: function(content){
		this.monitor = content;
		this.clear = false;
	},

	appendMonitor: function(content){
		this.monitor = this.monitor + '' + content;
	}

});
