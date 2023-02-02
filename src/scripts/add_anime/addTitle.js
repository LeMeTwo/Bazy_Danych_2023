$().ready(function () {
	const title =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="titleHelp" placeholder="Enter title">' +
		'<div id="titleHelp" class="form-text text-muted">' + 'Maximum 100 characters long.' + '</div>' +
		'</div>';
	$('#addTitle').append(title);
});