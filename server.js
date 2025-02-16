const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

const images = {
    golden_shade: "https://i.ibb.co/B5DQNq1S/image.png"  // Your image URL
};

app.get("/image_icon", async (req, res) => {
    const imageName = req.query.show;
    if (!images[imageName]) {
        return res.status(404).send("Image not found");
    }

    try {
        const image = await loadImage(images[imageName]);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        // Draw the original image
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // Add watermark text
        ctx.font = "50px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText("Pranto", 20, 60);

        res.setHeader("Content-Type", "image/png");
        canvas.createPNGStream().pipe(res);
    } catch (error) {
        res.status(500).send("Error processing image");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
