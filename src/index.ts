import express from "express";
import httpServer from "./presentation/websockets/websockets";

const PORT = process.env.PORT || 3000;

(httpServer as unknown as express.Application).listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
});
