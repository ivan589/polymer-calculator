/**
 * The 'web-calculator' renders a calculator composed of a numpad and 
 * a display area for the results and current operation
 *
 *
 * 
 * Example:
    <web-calculator theme="light"></web-calculator>
 *
 * 
 * Available themes: 'light', 'dark'
 * 
 * 
 * @author ivanfr26
 */
Polymer({

	//Default theme
	theme: 'light',

	//Numbers display in the numpad
	numbers: [7,8,9,4,5,6,1,2,3],

	//Number stack
	number1: 0,
	number2: 0,

	//The display monitor
	monitor: '0',
	replaceMonitorContent: 	true, //flag after certain operations

	//Delegates the Math functions
	opManager: 	new OperationsManager(),

	/**
	 * When `ready`, hooks a controller for the action `on-tap` of a button
	 *
	 * @event 		'btn-tap'
	 * @controller 	'handleButtonTap'	
	 */
	ready: function(){
		 document.querySelector('web-calculator').addEventListener('btn-tap', this.handleButtonTap);
		 this.updateOperation(this.opManager.ops.empty);
	},

	/**
	 * Receives the button object and delegates accordingly
	 *
	 * button obj in message for `on-tap` event:
	 	{btn: {
			symbol: this.content,
			value: 	this.value
		}}
	 *
	 * The `symbol` is a rendered text that the browser shows, 
	 * the `value` is a simpler string used to find the 
	 * function. This is a fix for how different OS and
	 * browser handle the html strings.
	 * 
	 */
	handleButtonTap: function(e){
		console.log(this.number1 + ' ' + this.number2);

		var btn = e.detail.btn;

		if(!isNaN(btn.value) || btn.value === '.'){
			this.handleNumber(btn.value);
		}else{
			this.handleOperation(btn);
		}
	},

	/**
	 * When a number is tapped, this controller is called
	 * 
	 */
	handleNumber: function(n){
		if(this.replaceMonitorContent){
			this.updateMonitor(n);
		}else{
			this.appendMonitor(n);
		}

		if(!this.opsInQueu()){
			this.number1 = Number(this.monitor);
		}else{
			this.number2 = Number(this.monitor);
		}

	},


	/**
	 * When an operation button is tapped, this controller is called
	 * 
	 */
	handleOperation: function(op){
		switch(op.value){
			case 'C':
				this.clearAll(); 
				break;

			case 'sqr':
				this.updateMonitor(this.opManager.exec(op, this.number1, this.number2));
				this.stackNumbers();
				break;

			case '=':
				this.updateMonitor(this.opManager.exec(this.operation, this.number1, this.number2));
				this.stackNumbers();
				this.updateOperation(this.opManager.ops.empty);
				break;

			default:
				if(this.opsInQueu()){
					this.updateMonitor(this.opManager.exec(this.operation, this.number1, this.number2));
					this.stackNumbers();

				}else if(this.number2 !== 0){
					this.updateMonitor(this.opManager.exec(op, this.number1, this.number2));
					this.stackNumbers();
				}
				this.updateOperation(op);
		}
		this.replaceMonitorContent = true;
	},


	/** 
	 * 
	 * HELPER METHODS
	 *
	 * This methods make the updating information easier,
	 * shorten the code neccesary for the calculator logic
	 * 
	 */


	// Is there and operation in quue? 
	opsInQueu: function(){
		return this.operation.value !== null;
	},

	// Updates the current operation to be executed
	updateOperation: function(op){
		this.operation = op;
	},

	// Updated the monitor content
	updateMonitor: function(content){
		this.monitor = content;
		this.replaceMonitorContent = false;
	},

	// Appends numbers to the monitor
	appendMonitor: function(content){
		this.monitor = this.monitor + '' + content;
	},

	// Saves the current result in number1 and clears number2
	stackNumbers: function(){
		this.number1 = Number(this.monitor);
		this.number2 = 0;
	},

	// Operation clear-all
	clearAll: function(){
		this.updateMonitor(0);
		this.number1 	= 0;
		this.number2 	= 0;
		this.replaceMonitorContent = true;
		this.operation 	= this.opManager.ops.empty;
	},

});
