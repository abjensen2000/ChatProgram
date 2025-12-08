document.addEventListener('DOMContentLoaded', () => {

    // Find knappen på siden
    const opretBtn = document.getElementById('tilbageTilForsiden');

    // Hvis knappen findes, tilføj klik-event
    if (opretBtn) {
        opretBtn.addEventListener('click', () => {
            // Redirect til oprettelses-siden
            window.location.href = '/login';
        });
    }
});