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

