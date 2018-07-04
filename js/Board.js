var board = {
	name: 'Tablica Kanban',
	addColumn: function(column) {
	this.element.appendChild(column.element);
	initSortable(column.id); //About this feature we will tell later
	},
	element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
	var name = prompt('Enter a column name');
	var data = new FormData();
	data.append('name', name);
	fetch(baseUrl + '/column', {method: 'POST', headers: myHeaders, body: data})
	.then(function(resp){
		return resp.json();
	})
	.then(function(resp){
		var column = new Column(resp.id, name);
		board.addColumn(column)
	})
});

function initSortable(id) {
	var el = document.getElementById(id);
	var sortable = Sortable.create(el, {
		group: 'kanban',
		sort: true,
		onEnd: function(event) {
			var newColumnId = event.to.id;
			var cardId = event.item.id;
			var cardName = event.item.querySelector('.card-description').innerHTML;
			var data = new FormData();
			data.append('id', cardId);
			data.append('name', cardName);
			data.append('bootcamp_kanban_column_id', newColumnId);
			fetch(baseUrl + '/card/' + cardId, {method: 'PUT', headers: myHeaders, body: data})
				.then(function(resp){
					return resp.json();
				})
		}
	});
}