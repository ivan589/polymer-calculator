

var OperationsManager = function() {
	this.operations = [
		{
			symbol: '+',
			funct: 	this.sum
		},
		{
			symbol: '-',
			funct: 	this.subtract
		},
		{
			symbol: 'x',
			funct: 	this.times
		},
		{
			symbol: '÷',
			funct: 	this.division
		},
		{
			symbol: '√',
			funct: 	this.sqrt
		}
	];
}

OperationsManager.prototype = {

	findBySymbol: function(symbol){
		for (var i = 0; i < this.operations.length; i++) {
			var operation = this.operations[i];
			if(operation.symbol === symbol){
				return this.operations[i].funct;
			}
		}
	},

	exec: function(op, num1, num2){
		var funct = this.findBySymbol(op);
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

	division: function(num1, num2){
		return num1 / num2;
	},

	sqrt: function(num1, num2){
		return Math.sqrt(num1);
	}

}