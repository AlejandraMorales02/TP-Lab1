function validateInput(inputId, errorId) {
    const input = document.getElementById(inputId).value;
    const errorMessage = document.getElementById(errorId);
    
    const regex = /\d/;

    if (regex.test(input)) {
        errorMessage.textContent = 'Este campo no debe contener números. El formulario no se procesará.';
        return false; // Retorna false si hay un error
    } else {
        errorMessage.textContent = '';
        return true; // Retorna true si no hay error
    }
}

document.getElementById('medalForm').addEventListener('submit', function(event) {
    const isCountryValid = validateInput('country', 'countryError');
    if (!isCountryValid) {
        event.preventDefault(); // Previene el envío del formulario si la validación falla
    }
});
