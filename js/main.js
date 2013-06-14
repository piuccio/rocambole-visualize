/* globals ace, rocambole, $, jQuery */
(function () {
	"use strict";
	var editor = ace.edit("editor");
	var error = document.getElementById("error");
	var tree = $("#tree");
	var ast;

	function displayError (exception) {
		error.className = "";
		error.innerHTML = exception.message;
		tree.addClass("hidden");
	}

	function hideError () {
		error.className = "hidden";
	}

	function displayTree () {
		hideError();
		tree.removeClass("hidden");

		var content = generateList("", ast);
		tree.html(content);
	}

	function generateList (path, ast) {
		var content = $("<ul>");
		for (var key in ast) {
			var fullPath = path ? path + "|" + key : key;
			if (jQuery.isArray(ast[key])) {
				content.append(generateRecurringNode(fullPath, key, ast[key]));
			} else if (jQuery.isPlainObject(ast[key])) {
				content.append(generateObjectNode(fullPath, key, ast[key]));
			} else {
				content.append(generatePlainNode(key, ast[key]));
			}
		}
		return content;
	}

	function expandableTemplate (model) {
		var tpl = "<li data-id='%id%' data-collapsed='%value%' class='expand closed'><i/><span class='key'>%key%:</span><div class='more'>%value%</div></li>";
		return tpl.replace(/%([a-z]+)%/g, function (wholeMatch, key) {
			return model[key];
		});
	}

	function generateObjectNode (path, key, ast) {
		var model = {
			id : path,
			key : key,
			value : "{}"
		};
		return $(expandableTemplate(model));
	}

	function generateRecurringNode (path, key, ast) {
		var model = {
			id : path,
			key : key,
			value : "[" + ast.length + "]"
		};
		return $(expandableTemplate(model));
	}

	function generatePlainNode (key, value) {
		var actualValue = (value && value.call) ? "function () {}" : JSON.stringify(value);
		return $("<li class='plain'><i/><span class='key'>" + key + ":</span><span class='value " + typeof value + "'>" + actualValue + "</span></li>");
	}

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");

	function onChange () {
		var code = editor.getValue();
		try {
			ast = rocambole.parse(code);
			displayTree();
		} catch (ex) {
			displayError(ex);
		}
	}

	editor.getSession().on('change', onChange);
	// when ready
	$(onChange);

	tree.on("click", "li.expand", function (event) {
		var element = $(this);
		var target = $(event.target);

		if (!target.is(".expand") && !target.parent().is(".expand")) {
			// Don't react on clicks inside .more
			event.stopPropagation();
			return;
		}

		if (element.hasClass("closed")) {
			var id = element.data("id");
			var object = extractObject(id);
			var content = generateList(id, object);
			element.children(".more").html(content);
			element.removeClass("closed");
			event.stopPropagation();
		} else {
			element.children(".more").html(element.attr("data-collapsed"));
			element.addClass("closed");
			event.stopPropagation();
		}
	});

	function extractObject (id) {
		var path = id.split("|");
		var container = ast;
		while (path.length > 0) {
			var token = path.shift();
			container = container[token];
		}
		return container;
	}
})();
