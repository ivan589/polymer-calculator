/**
 * The 'web-calculator' renders a calculator composed of a numpad and 
 * a display area for the results and current operation
 * 
 * Example:
    <web-calculator theme="light"></web-calculator>
 *
 * Available themes: 'light', 'dark'
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

	mathMgr: new MathManager(),

	/**
	 * When `ready`, hooks a controller for the action `on-tap` of a button
	 */
	ready: function(){
		 document.querySelector('web-calculator').addEventListener('btn-tap', this.handleButtonTap);
		 this.updateOperation(OPERATION_EMPTY);
	},

	/**
	 * Receives the button object and delegates accordingly
	 *
		{btn: {
			symbol: "+",
			name: 	"sum"
		}}
	 */
	handleButtonTap: function(e){
		var btn = e.detail.btn;

		if(!isNaN(btn.symbol) || btn.symbol === '.'){
			this.handleNumber(btn.symbol);
		}else{
			this.handleOperation(btn);
		}
	},

	/**
	 * When a number is tapped, delegates to numbersManager
	 */
	handleNumber: numbersManager,


	/**
	 * When an operation button is tapped, delegates to operationsManager
	 */
	handleOperation: operationsManager,


	/** 
	 * HELPER METHODS
	 *
	 * This methods make updating information easier,
	 * shorten the code neccesary for the calculator logic
	 */

	// Is there and operation in quue? 
	opsInQueu: function(){
		return this.operation.name !== OPERATION_EMPTY.name; 
	},

	// Updates the current operation to be executed
	updateOperation: function(op){
		this.operation = op;
	},

	// Updated the monitor content flags for future content
	updateMonitor: function(content){
		this.monitor = content;
		this.replaceMonitorContent = false;
	},

	// Appends numbers to the monitor
	appendMonitor: function(content){
		this.monitor = this.monitor + '' + content;
	},

	// Deletes the last char in the monitor
	backMonitor: function(){
		var aux = this.monitor.toString().slice(0, -1);
		this.monitor = (aux.length <= 0) ? 0 : aux;
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
		this.operation 	= OPERATION_EMPTY;
	},

});
