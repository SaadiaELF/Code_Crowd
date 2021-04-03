var myWidget = cloudinary.createUploadWidget({
    cloudName: 'birminghambcs',
    uploadPreset: 'gbw7i3gr'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        // console.log(result.info.url);
        const imageUrl = result.info.url;
        console.log(imageUrl);
        async function fetchAsync() {
            const response = await fetch('/profile/1', {
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
