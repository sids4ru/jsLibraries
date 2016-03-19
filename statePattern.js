/**
 ** FileName : 	StatePattern.js
 ** Author	:	Siddharth Bagai
 ** URL	: http://github.com/sids4ru
 ** Description	:	js state pattern implementation
 ** Liscence : MIT
 ** Date		:	06/12/2014
 **/
/**
 ** Class Name : 	_State
 ** Description	:	js state pattern implementation
 **	Parameters : object: state object
 **/
function _State(object) {
	if (object === undefined) {
		object = new function () {
			this.name = "NO_STATE",
			this.onEnter = function (data) {},
			this.onExit = function (data) {},
			this.next = function (name, data) {
				return name;
			},
			this.update = function (data) {};
		};

	};
	this.name = object.name;
	if (this.name === undefined)
		console.log("Give name");
	this.onEnter = object.onEnter;
	if (this.onEnter === undefined)
		console.log("Give onEnter")
		this.onExit = object.onExit;
	if (this.onExit === undefined)
		console.log("Give onExit");
	this.next = object.next;
	if (this.next === undefined)
		console.log("Give next(name)");
	this.update = object.update;
	if (this.update === undefined)
		console.log("give update");
}
function _StateMachine() {
	var states = [];
	var current = states["NO_STATE"] = new _State();
	this.setState = function (name, data) {
		if (current.name === name) {
			return current.update(data);
		}
		prev = current;
		current = states[current.next(name, data)];
		if (current === prev) {
			return current.update(data);
		}
		prev.onExit(data);
		if (current === undefined) {
			current = states["NO_STATE"];
		}
		current.onEnter(data);
		return current.update(data);
	}
	this.addState = function (st) {
		states[st.name] = st;
	}
}