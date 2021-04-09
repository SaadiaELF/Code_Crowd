// Upload a profile picture on the click of the Upload Photo button
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'birminghambcs',
    uploadPreset: 'gbw7i3gr'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        const imageUrl = result.info.url;
        async function fetchAsync() {
            const id = document.getElementById("upload_widget").getAttribute('data-id');
            const response = await fetch(`/profile/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ imageUrl, id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, redirect the browser to the dashboard page
                document.location.reload();
            } else {
                alert('Failed to update image');
            }
        };
        fetchAsync();
    }
}
)

// Call button from the side-navbar.handlebars to apply function to
document.getElementById("upload_widget").addEventListener("click", async function () {
    await myWidget.open();

}, false);