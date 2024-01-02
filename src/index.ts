import app from "./presentation/express"

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});