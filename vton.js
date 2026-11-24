// Service to interact with the try-on-diffusion RapidAPI endpoint
// Using the IDM-VTON model

/**
 * Fetches Blob from an Object URL
 */
const getBlobFromUrl = async (url) => {
    const response = await fetch(url);
    return await response.blob();
};

export const generateVTON = async (personImageUrl, garmentImageUrl) => {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

    if (!apiKey) {
        throw new Error("API Key for RapidAPI is missing in .env");
    }

    try {
        // Convert local preview URLs to actual File Blobs
        const personBlob = await getBlobFromUrl(personImageUrl);
        const garmentBlob = await getBlobFromUrl(garmentImageUrl);

        // API expects multipart/form-data with exact parameter names
        const formData = new FormData();
        formData.append('avatar_image', personBlob, "avatar.jpg");
        formData.append('clothing_image', garmentBlob, "garment.jpg");

        const options = {
            method: 'POST',
            headers: {
                // Note: Do not manually set 'Content-Type' when using FormData in fetch,
                // the browser automatically sets it with the correct boundary!
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            },
            body: formData
        };

        const response = await fetch(`https://${apiHost}/try-on-file`, options);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API Error ${response.status}: ${errorData}`);
        }

        // The RapidAPI endpoint returns a raw binary image blob, NOT JSON
        const resultBlob = await response.blob();

        // Convert the returned raw image into a local Object URL for the browser to display
        return URL.createObjectURL(resultBlob);

    } catch (error) {
        console.error("VTON Generation Error:", error);
        throw error;
    }
};
