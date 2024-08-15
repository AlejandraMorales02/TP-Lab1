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

document.getElementById('medalsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isCountryValid = validateInput('country', 'error-message');

    // Si hay un error en la validación, no se procesa el formulario
    if (!isCountryValid) {
        return;
    }
    
    const country = document.getElementById('country').value;
    const gold = parseInt(document.getElementById('gold').value);
    const silver = parseInt(document.getElementById('silver').value);
    const bronze = parseInt(document.getElementById('bronze').value);
    
    const total = gold + silver + bronze;        
        
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Resumen de Medallas</h2>
        <p>País: ${country}</p>
        <p>Oro: ${gold}</p>
        <p>Plata: ${silver}</p>
        <p>Bronce: ${bronze}</p>
        <p><strong>Total de Medallas: ${total}</strong></p>
    `;
});