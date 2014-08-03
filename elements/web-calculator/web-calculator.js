
Polymer({
	theme: 'light',

	numbers: 	[7,8,9,4,5,6,1,2,3],
	number1: 	0,
	number2: 	0,
	clear: 		true,
	monitor: 	'0',
	opManager: 	new OperationsManager(),

	ready: function(){
		 document.querySelector('web-calculator').addEventListener('btn-tap', this.handleButtonTap);
		 this.updateOperation(this.opManager.ops.empty);
	},

	handleButtonTap: function(e){
		var btn = e.detail.btn;

		if(!isNaN(btn.value) || btn.value === '.'){
			this.handleNumber(btn.value);
		}else{
			this.handleOperation(btn);
		}
	},

	handleNumber: function(n){
		if(this.clear){
			this.updateMonitor(n);
		}else{
			this.appendMonitor(n);
		}

		if(this.operation.value === null){
			this.number1 = Number(this.monitor);
		}else{
			this.number2 = Number(this.monitor);
		}

	},

	handleOperation: function(op){
		switch(op.value){
			case 'C':
				this.clearAll(); 
				break;

			case 'sqr':
				this.monitor = this.opManager.exec(op, this.number1, this.number2);
				this.operationDone();
				break;

			case '=':
				this.monitor = this.opManager.exec(this.operation, this.number1, this.number2);
				this.updateOperation(this.opManager.ops.empty);
				this.operationDone();		
				break;

			default:
				if(this.operation.value !== null){
					this.monitor = this.opManager.exec(this.operation, this.number1, this.number2);
					this.operationDone();		

				}else if(this.number2 !== 0){
					this.monitor = this.opManager.exec(op, this.number1, this.number2);
					this.operationDone();

				}
				this.updateOperation(op);
		}
		this.clear 	= true;
	},


	operationDone: function(){
		this.number1 = this.monitor;
		this.number2 = 0;
	},

	updateOperation: function(op){
		this.operation = op;
	},

	clearAll: function(){
		this.number1 = 0;
		this.number2 = 0;
		this.updateMonitor(0);
		this.operation = this.opManager.ops.empty;
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
