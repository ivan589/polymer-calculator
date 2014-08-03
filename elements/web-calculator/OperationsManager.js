
var OperationsManager = function() {
	this.ops = {
		empty		: {toStr: '', 	value: null},
		clear		: {toStr: 'C', 	value: 'C'},
		equal		: {toStr: '=', 	value: '='},

		sum 		: {toStr: '+', 	value: '+', 	funct: this.sum},
		subtract	: {toStr: '-', 	value: '-', 	funct: this.subtract},
		times		: {toStr: 'x', 	value: 'x', 	funct: this.times},
		divide		: {toStr: '÷', 	value: 'div', 	funct: this.divide},
		sqroot		: {toStr: '√', 	value: 'sqr', 	funct: this.sqroot}	
	}; 
}

OperationsManager.prototype = {

	find: function(op){
		for(i in this.ops){
			if(this.ops[i].value === op.value){
				return this.ops[i].funct;
			}
		}
	},

	exec: function(op, num1, num2){
		var funct = this.find(op);
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