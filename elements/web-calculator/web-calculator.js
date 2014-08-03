
Polymer({
	theme: 'light',

	numbers: 	[7,8,9,4,5,6,1,2,3],
	number1: 	0,
	number2: 	0,
	clear: 		true,
	monitor: 	'0',
	operation: 	'',
	opManager: {},

	ready: function(){
		 document.querySelector('web-calculator').addEventListener('btn-tap', this.handleButtonTap);
		 this.opManager = new OperationsManager();
	},

	handleButtonTap: function(e){
		var btnContent = e.detail.btn;

		if(!isNaN(btnContent) || btnContent === '.'){
			this.handleNumber(btnContent);
		}else{
			this.handleOperation(btnContent);
		}
	},

	handleNumber: function(n){
		if(this.clear){
			this.updateMonitor(n);
		}else{
			this.appendMonitor(n);
		}

		if(this.operation === ''){
			this.number1 = Number(this.monitor);
		}else{
			this.number2 = Number(this.monitor);
		}

	},

	handleOperation: function(op){
		switch(op){
			case 'C':
				this.clearAll(); 
				break;

			case '√':
				this.monitor = this.opManager.exec(op, this.number1, this.number2);
				break;

			case '=':
				this.monitor = this.opManager.exec(this.operation, this.number1, this.number2);
				this.operation = '';
				break;

			default:
				if(this.number2 !== 0){
					this.monitor = this.opManager.exec(op, this.number1, this.number2);
					this.number1 = this.monitor;
					this.number2 = 0;
				}
				this.operation = op;
		}
		this.clear 	= true;
	},

	clearAll: function(){
		this.number1 = 0;
		this.number2 = 0;
		this.updateMonitor(0);
		this.operation = '';
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
