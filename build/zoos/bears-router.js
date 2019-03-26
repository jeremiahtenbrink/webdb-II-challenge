"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Knex = require("knex");
const bearsRouter = express_1.Router();
const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3',
    },
};
const db = Knex(knexConfig);
bearsRouter.get('/', (req, res) => {
    // returns a promise that resolves to all records in the table
    db('bears')
        .then((zoos) => {
        res.status(200).json(zoos);
    })
        .catch((error) => {
        res.status(500).json(error);
    });
});
bearsRouter.get('/:id', (req, res) => {
    const zooId = req.params.id;
    db('bears')
        .where({ id: zooId })
        .first()
        .then((zoo) => {
        res.status(200).json(zoo);
    })
        .catch((error) => {
        res.status(500).json(error);
    });
});
bearsRouter.post('/', (req, res) => {
    db('bears')
        .insert(req.body)
        .then((ids) => {
        const id = ids[0];
        db('bears')
            .where({ id })
            .first()
            .then((zoo) => {
            res.status(201).json(zoo);
        });
    })
        .catch((error) => {
        res.status(500).json(error);
    });
});
bearsRouter.put('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .update(req.body)
        .then((count) => {
        if (count > 0) {
            res.status(200).json(count);
        }
        else {
            res.status(404).json({ message: 'Record not found' });
        }
    })
        .catch((error) => {
        res.status(500).json(error);
    });
});
bearsRouter.delete('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .del()
        .then((count) => {
        if (count > 0) {
            res.status(204).end();
        }
        else {
            res.status(404).json({ message: 'Record not found' });
        }
    })
        .catch((error) => {
        res.status(500).json(error);
    });
});
module.exports = bearsRouter;
//# sourceMappingURL=bears-router.js.map