var myWidget = cloudinary.createUploadWidget({
    cloudName: 'birminghambcs',
    uploadPreset: 'gbw7i3gr'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        const imageUrl = result.info.url;
        async function fetchAsync() {
            const response = await fetch('/profile/bcec3b1b-3814-4a4b-b27d-1b3aca3f4097', {
                method: 'PUT',
                body: JSON.stringify({ imageUrl }),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok) {
                // If successful, redirect the browser to the dashboard page
                document.location.replace('/profile');
            } else {
                alert('Failed to update image');
            }
        };
        fetchAsync();

    }
}
)
document.getElementById("upload_widget").addEventListener("click", async function () {
    await myWidget.open();

}, false);

var myWidget2 = cloudinary.createUploadWidget({
    cloudName: 'birminghambcs',
    uploadPreset: 'gbw7i3gr'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        const screenshotUrl = result.info.secure_url;
        document.getElementById("img_preview").classList.remove("hide");
        document.getElementById("img_preview").src = screenshotUrl;
        document.getElementById('screenshot_url').innerHTML = screenshotUrl;
    }
}
)
document.getElementById("upload_img_widget").addEventListener("click", async function () {
    await myWidget2.open();

}, false);

