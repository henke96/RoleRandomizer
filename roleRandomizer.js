let htmlTable;
let htmlTableHeaderRow;
let htmlTableBodyRows;
let htmlTableFooterRow;
const nameInputs = [];
const checkboxInputs = [];
const resultDatas = [];
window.onload = function() {
	htmlTable = document.getElementById("table");
	htmlTableHeaderRow = htmlTable.firstElementChild.firstElementChild;
	htmlTableBodyRows = htmlTable.children[1].getElementsByTagName("tr");
	htmlTableFooterRow = htmlTable.children[2].firstElementChild;
	generateTables();
}
function generateTables() {
	let headers = ["Name", "Main attacker", "2nd attacker", "Healer", "Collector", "Defender"];
	for (let i = 0; i < 6; ++i) {
		let header = document.createElement("th");
		header.innerHTML = headers[i];
		htmlTableHeaderRow.append(header);
	}
	for (let i = 0; i < htmlTableBodyRows.length; ++i) {
		let row = htmlTableBodyRows[i];
		checkboxInputs[i] = [];
		for (let j = 0; j < 6; ++j) {
			let data = document.createElement("td");
			let input = document.createElement("input");
			if (j == 0) {
				input.type = "text";
				input.size = "10";
				input.tabIndex = i + 1;
				nameInputs[i] = input;
			} else {
				input.type = "checkbox";
				input.checked = true;
				checkboxInputs[i][j - 1] = input;
			}
			data.append(input);
			row.append(data);
			if (i == 0 && j == 0) input.focus();
		}
	}
	for (let i = 0; i < 6; ++i) {
		let data;
		if (i == 0) {
			data = document.createElement("th");
			data.innerHTML = "Result";
		} else {
			data = document.createElement("td");
			resultDatas[i - 1] = data;
		}
		htmlTableFooterRow.append(data);
	}
}
function solve() {
	let possible = [];
	for (let i = 0; i < 5; ++i) {
		if (!checkboxInputs[0][i].checked) continue;
		for (let j = 0; j < 5; ++j) {
			if (j == i || !checkboxInputs[1][j].checked) continue;
			for (let k = 0; k < 5; ++k) {
				if (k == i || k == j || !checkboxInputs[2][k].checked) continue;
				for (let l = 0; l < 5; ++l) {
					if (l == i || l == j || l == k || !checkboxInputs[3][l].checked) continue;
					for (let m = 0; m < 5; ++m) {
						if (m == i || m == j || m == k || m == l || !checkboxInputs[4][m].checked) continue;
						possible.push([i, j, k, l, m]);
					}
				}
			}
		}
	}
	if (possible.length > 0) {
		let chosenIndex = Math.floor(Math.random() * possible.length);
		let chosen = possible[chosenIndex];
		for (let i = 0; i < 5; ++i) {
			resultDatas[chosen[i]].innerHTML = nameInputs[i].value;
		}
	} else {
		for (let i = 0; i < 5; ++i) {
			resultDatas[i].innerHTML = "Impossible!"
		}
	}
}
function removePrevious() {
	for (let i = 0; i < 5; ++i) {
		let name = resultDatas[i].innerHTML;
		if (name.length > 0) {
			for (let j = 0; j < 5; ++j) {
				if (nameInputs[j].value == name) {
					checkboxInputs[j][i].checked = false;
				}
			}
		}
	}
}
function enableAll() {
	for (let i = 0; i < 5; ++i) {
		for (let j = 0; j < 5; ++j) {
			checkboxInputs[i][j].checked = true;
		}
	}
}