
var MathManager = function() {
	this.availableOperations = [];

	// Available mathemathis operations
	this.availableOperations[OPERATION_SUM.name] 		= this.sum;
	this.availableOperations[OPERATION_SUBTRACT.name] 	= this.subtract;
	this.availableOperations[OPERATION_TIMES.name] 		= this.times;
	this.availableOperations[OPERATION_DIVIDE.name] 	= this.divide;
	this.availableOperations[OPERATION_SQROOT.name] 	= this.sqroot;

	/* 
		Continue to add here whatever other math functions you need 
		remember to add the definition constant in the `CalculatorConfig.js`
	*/
}

MathManager.prototype = {

	// Finds function of the desired operation to run
	find: function(operation){
		return this.availableOperations[operation.name];
	},

	exec: function(operation, num1, num2){
		var funct = this.find(operation);
		return funct(num1, num2);
	},

	sum: function(num1, num2){
		return num1 + num2;
	},

	subtract: function(num1, num2){
		return num1 - num2;
	},

	times: function(num1, num2){
		return num1 * num2;
	},

	divide: function(num1, num2){
		return num1 / num2;
	},

	sqroot: function(num1, num2){
		return Math.sqrt(num1);
	}

}