//function to convert audio to base64
function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                const result = reader.result;
                resolve(result.split(",")[1]);
            }
        };
        reader.readAsDataURL(blob);
    });
}

export default blobToBase64;