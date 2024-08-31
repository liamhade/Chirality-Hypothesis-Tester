function grabInput(json_path) {
	fetch(json_path)
		.then(response => response.json())
		.then(data => {
			console.log(data)
		})
};

grabInput("C:\Users\Liam Hade\Desktop\chirality-hypothesis-tester\tests\input.json")