import fs from 'fs';

const testApi = async () => {
    const apiKey = "87ba00cf61msh66a54f04af909bep1a109fjsn1cbcb5a50299";
    const apiHost = "try-on-diffusion.p.rapidapi.com";

    console.log("Testing POST to https://try-on-diffusion.p.rapidapi.com/try-on-file");

    try {
        const formData = new FormData();

        // Creating a valid minimum 256x256 blank image blob
        // We will just use an external real image URL to ensure validation passes
        const getBlobFromUrl = async (url) => {
            const response = await fetch(url);
            return await response.blob();
        };

        console.log("Downloading test images...");
        const personBlob = await getBlobFromUrl("https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=256&h=256&fit=crop");
        const garmentBlob = await getBlobFromUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=256&h=256&fit=crop");
        console.log("Test images downloaded.");

        formData.append('avatar_image', personBlob, "avatar.jpg");
        formData.append('clothing_image', garmentBlob, "garment.jpg");

        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            },
            body: formData
        };

        console.log("Sending to RapidAPI...");
        const response = await fetch(`https://${apiHost}/try-on-file`, options);

        console.log(`Status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.text();
            console.error(`API Error: ${errorData}`);
        } else {
            console.log("Success! Headers:", response.headers);
        }

    } catch (e) {
        console.error("Fetch failed", e);
    }
}

testApi();
