"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const server = express_1.default();
const zooRouter = require('./zoos/zoos-router');
const bearsRouter = require('./zoos/bears-router');
server.use(express_1.default.json());
server.use(helmet_1.default());
// endpoints here
server.use('/zoos', zooRouter);
server.use('/bears', bearsRouter);
server.use('/', (req, res) => {
    res.status(200).json({ message: "Yup it works" });
});
const port = 3200;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
//# sourceMappingURL=index.js.map