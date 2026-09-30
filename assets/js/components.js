document.addEventListener("DOMContentLoaded", async () => {

    const pageRoot = document.body.dataset.pageRoot || ".";

    // Load common header
    const headerContainer = document.getElementById("common-header");

    if (headerContainer) {
        try {
            const response = await fetch(
                `${pageRoot}/components/header.html`
            );

            if (!response.ok) {
                throw new Error("Header could not be loaded.");
            }

            headerContainer.innerHTML = await response.text();

        } catch (error) {
            console.error("Header loading error:", error);
        }
    }

    // Load common footer
    const footerContainer = document.getElementById("common-footer");

    if (footerContainer) {
        try {
            const response = await fetch(
                `${pageRoot}/components/footer.html`
            );

            if (!response.ok) {
                throw new Error("Footer could not be loaded.");
            }

            footerContainer.innerHTML = await response.text();

        } catch (error) {
            console.error("Footer loading error:", error);
        }
    }

});