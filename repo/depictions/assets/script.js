const packageInfo = `../api/packageinfo/`;

// Get package ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('packageId');

function loadData() {
	setIcon();
	fetchInfo();
	setScreenshots();
}

function setIcon() {
	document.getElementById('package-icon').src = `${packageInfo}${packageId}/icon.png`;
}

function fetchInfo() {
	fetch(`${packageInfo}${packageId}/display.json`)
		.then((response) => response.json())
		.then((data) => {
			// Get package control info from control.json file
			fetch(`${packageInfo}${packageId}/control.json`)
				.then((response) => response.json())
				.then((controlData) => {
					if (data.contact.twitter) {
						const twitter = document.getElementById('twitter');
						twitter.innerText = data.contact.twitter;
						twitter.href = `https://twitter.com/${data.contact.twitter}`;
					}

					if (data.contact.discord) {
						const discord = document.getElementById('discord');
						discord.innerText = 'Discord';
						discord.href = `${data.contact.discord}`;
					}

					if (data.information.source_code_link) {
						const sourceCode = document.getElementById('source-code');
						sourceCode.innerText = 'View source';
						sourceCode.href = `${data.information.source_code_link}`;
					}

					document.getElementById('package-name').innerText = controlData.Name;
					document.getElementById('version').innerText = controlData.Version;
					document.getElementById('author').innerText = controlData.Author;
					document.getElementById('section').innerText = controlData.Section;
					document.getElementById('description').innerText = data.information.description;

					let changelogHTML = '';
					data.changelog.reverse().forEach((entry) => {
						changelogHTML += `<div class="changelog-row rowFontSize rowPadding">`;
						changelogHTML += `<div class="changelog-header">`;
						changelogHTML += `<div class="changelog-version">${entry.version_number}</div>`;
						changelogHTML += `<div class="changelog-date">${entry.date}</div>`;
						changelogHTML += `</div>`;
						changelogHTML += `<div class="changelog-changes">${entry.changes.replace(/\n/g, '<br/>')}</div>`;
						changelogHTML += `</div>`;
					});
					document.getElementById('changelog').innerHTML = changelogHTML;
				})
				.catch((error) => {
					// Display error message if package control info cannot be loaded
					const content = document.getElementById('content');
					content.innerHTML = `Error loading package control info for ${packageId}: ${error}`;
				});
		})
		.catch((error) => {
			// Display error message if package info cannot be loaded
			const content = document.getElementById('content');
			content.innerHTML = `Error loading package info for ${packageId}: ${error}`;
		});
}

function setScreenshots() {
	const container = document.querySelector('#imageCarousel');
	fetch(`${packageInfo}${packageId}/screenshots.json`)
		.then((response) => response.json())
		.then((data) => {
			data.screenshots.forEach((screenshot) => {
				if (isValid(screenshot)) {
					const img = document.createElement('img');
					img.src = `${packageInfo}${packageId}/screenshots/${screenshot}`;
					container.appendChild(img);
				}
			});
		})
		.catch((error) => {
			// Display error message if package control info cannot be loaded
			const content = document.getElementById('imageCarousel');
			content.innerHTML = `Error loading screenshots`;
		});
}

function isValid(file) {
	return file.length > 1;
}
