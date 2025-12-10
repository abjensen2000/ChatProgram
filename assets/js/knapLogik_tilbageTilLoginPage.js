document.addEventListener('DOMContentLoaded', () => {

    // Find knappen på siden
    const tilbageBtn = document.getElementById('tilbageTilForsiden');

    // Hvis knappen findes, tilføj klik-event
    if (tilbageBtn) {
        tilbageBtn.addEventListener('click', () => {
            // Redirect til oprettelses-siden
            window.location.href = '/login';
        });
    }
});