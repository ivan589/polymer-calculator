

/**
 * This file has to be loaded BEFORE the `MathManager.js`
 * 	
 * This file contains the constant deifnitions for the 
 * calculator, it is used by the `MathManager.js`
 * to link this definitions with the corresponding math functions
 * 
 */

var MAX_INPUTS = 10;

// keys obejcts
var OPERATION_EMPTY = {symbol: '', 	name: 'empty'};
var OPERATION_CLEAR = {symbol: 'C', name: 'clear'};
var OPERATION_BACK 	= {symbol: '<', name: 'back' };
var OPERATION_EQUAL	= {symbol: '=', name: 'equal'};

var OPERATION_SUM 		= {symbol: '+', name: 'sum'};
var OPERATION_SUBTRACT  = {symbol: '-', name: 'sub'};
var OPERATION_TIMES		= {symbol: 'x', name: 'tim'};
var OPERATION_DIVIDE	= {symbol: '÷', name: 'div'};
var OPERATION_SQROOT	= {symbol: '√', name: 'sqr'}


/* REGISTER KEYS in MAP */
var keys = [];

// Available keys
keys['OPERATION_EMPTY'] = OPERATION_EMPTY;
keys['OPERATION_CLEAR'] = OPERATION_CLEAR;
keys['OPERATION_BACK'] 	= OPERATION_BACK;
keys['OPERATION_EQUAL'] = OPERATION_EQUAL;

// Available keys with math functions
keys['OPERATION_SUM'] 		= OPERATION_SUM;
keys['OPERATION_SUBTRACT'] 	= OPERATION_SUBTRACT;
keys['OPERATION_TIMES'] 	= OPERATION_TIMES;
keys['OPERATION_DIVIDE'] 	= OPERATION_DIVIDE;
keys['OPERATION_SQROOT'] 	= OPERATION_SQROOT;


var CalculatorConfig = {
	ops : keys,

	findByName: function(name){
		for (var i = 0; i < this.ops.length; i++) {
			var op = this.ops[i];
			if(op.name === name){
				return op;
			}
		}
		return false;
	},

	findBySymbol: function(symbol){
		for (var i = 0; i < this.ops.length; i++) {
			var op = this.ops[i];
			if(op.symbol === symbol){
				return op;
			}
		}
		return false;
	}
}


















