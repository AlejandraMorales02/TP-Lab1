function validateInput(inputId, errorId) {
    const input = document.getElementById(inputId).value;
    const errorMessage = document.getElementById(errorId);
    
    const regex = /\d/;

    if (regex.test(input)) {
        errorMessage.textContent = 'Este campo no debe contener números. El formulario no se procesara';
        return false; // Retorna false si hay un error
    } else {
        errorMessage.textContent = '';
        return true; // Retorna true si no hay error
    }
}

document.getElementById('country').addEventListener('input', function() {
    validateInput('country', 'error-message');
});

document.getElementById('medalForm').addEventListener('submit', function(e) {
    e.preventDefault();
	
	const isCountryValid = validateInput('country', 'error-message');

    // Si hay un error en la validación, no se procesa el formulario
    if (!isCountryValid) {
        return;
    }

    const country = document.getElementById('country').value;
    const gold = parseInt(document.getElementById('gold').value, 10);
    const silver = parseInt(document.getElementById('silver').value, 10);
    const bronze = parseInt(document.getElementById('bronze').value, 10);
    const total = gold + silver + bronze;

    const tableBody = document.getElementById('medalTableBody');
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
        <tr>
            <td>${country}</td>
            <td>${gold}</td>
            <td>${silver}</td>
            <td>${bronze}</td>
            <td>${total}</td>
        </tr>
    `;

    document.getElementById('medalForm').reset();
});