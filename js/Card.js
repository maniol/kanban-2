// KLASA KANBAN CARD
function Card(id , name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = generateTemplate('card-template', { description: this.name}, 'li');
	//adding id to be have it accessible through sortable object
	this.element.id = this.id;
	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();
		if (event.target.classList.contains('btn-delete')) {
			self.removeCard();
		}
		if (event.target.classList.contains('btn-edit')) {
			self.editCard();
		}
	});
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		fetch(baseUrl + '/card/' + this.id, {method: 'DELETE', headers: myHeaders})
			.then(function(resp) {
				return resp.json();
			})
			.then(function(resp){
				self.element.parentNode.removeChild(self.element);
			})
	},
	editCard: function() {
		var self = this;
		var newCardName = prompt('Enter the new name of the card');
		event.preventDefault();
		var data = new FormData();
		data.append('name', newCardName);
		data.append('id', this.id);
		fetch(baseUrl + '/card/' + this.id, {method: 'PUT', headers: myHeaders, body: data})
			.then(function(resp){
				return resp.json();
			})
			.then(function(resp){
				self.element.querySelector('.card-description').innerHTML = newCardName;
			})
	}
};