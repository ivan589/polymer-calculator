
/**
 * Controller called when an operator key is tap,
 * this is simply a pointer to a function that
 * grabs the context from the Polymer object definition
 * 
 * 
 * @param  {OPERATION_*} op 
 */
var operationsManager = function(op){
	switch(op.name){
		case 'clear':
			this.clearAll(); 
			break;

		case 'back':
			this.backMonitor();
			break;

		case 'sqr':
			this.updateMonitor(this.mathMgr.exec(op, this.number1, this.number2));
			this.stackNumbers();
			break;

		case 'equal':
			this.updateMonitor(this.mathMgr.exec(this.operation, this.number1, this.number2));
			this.stackNumbers();
			this.updateOperation(OPERATION_EMPTY);
			break;

		default:
			if(this.opsInQueu()){
				this.updateMonitor(this.mathMgr.exec(this.operation, this.number1, this.number2));
				this.stackNumbers();

			}else if(this.number2 !== 0){
				this.updateMonitor(this.mathMgr.exec(op, this.number1, this.number2));
				this.stackNumbers();
			}
			this.updateOperation(op);
	}
	this.replaceMonitorContent = true;
}


/**
 * Controller called when a number key is tap,
 * this is simply a pointer to a function that
 * grabs the context from the Polymer object definition
 *
 * This function controls the LIMIT_INPUTS, meaning the length
 * of the `monitor` content in number of chars, fires
 * `monitor-limit-reached` when true
 * 
 * @param  {Number} n
 */
var numbersManager = function(n, force){
	if(this.monitor === '0' && n === '0') return;

	if(this.replaceMonitorContent){
		this.updateMonitor(n);

	}else{
		if(this.monitor.toString().length === MAX_INPUTS){
			this.fire('monitor-limit-reached');
			return;
		}
		if(this.monitor.toString().indexOf('.') > -1 && n === '.') return;
		this.appendMonitor(n);
	}

	if(!this.opsInQueu()){
		this.number1 = Number(this.monitor);
	}else{
		this.number2 = Number(this.monitor);
	}
}
