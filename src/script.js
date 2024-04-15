function fetchDrivers() {
    const year = document.getElementById('yearInput').value;
    if (!year) {
        alert('Enter year');
        return;
    }

    const apiUrl = `https://ergast.com/api/f1/${year}/drivers.json`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayDriverInfo(data.MRData);
        displayDrivers(data.MRData.DriverTable.Drivers);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayDriverInfo(metadata) {
    document.getElementById('series').textContent = metadata.series;
    document.getElementById('season').textContent = metadata.DriverTable.season;
    document.getElementById('totalResults').textContent = metadata.total;
}

function displayDrivers(drivers) {
    const tableBody = document.getElementById('driversTable');
    tableBody.innerHTML = ''; // Clearing the existing data

    drivers.forEach(driver => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = `${driver.givenName} ${driver.familyName}`;
        row.insertCell(1).textContent = driver.permanentNumber || 'N/A';
        row.insertCell(2).textContent = driver.nationality;
        row.insertCell(3).textContent = driver.dateOfBirth;
        const bioLink = document.createElement('a');
        bioLink.href = driver.url;
        bioLink.textContent = 'Bio';
        bioLink.target = '_blank';
        row.insertCell(4).appendChild(bioLink);
    });
}
