"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const router = (0, express_1.Router)();
router.post('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, deskripsi, deadline, user_id } = req.body;
    const userId = 1; // Default user_id untuk testing
    try {
        const result = yield db_1.default.query("INSERT INTO tasks (title, deskripsi, deadline, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, deskripsi, deadline, user_id, userId]);
        res.status(201).json({ status: "success", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}));
router.get('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('select * from tasks');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
router.get('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query(`SELECT * FROM tasks WHERE task_id = $1`, [id]);
        res.json(result.rows[0]);
        res.status(200).json({ status: 'success', data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}));
router.put('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, deskripsi, deadline } = req.body;
    try {
        const result = yield db_1.default.query('update tasks set title = $1,deskrisi = $2, deadline=$3,is_compeleted =$4,update_at = now() WHERE taks_id = $5 RETURNING *', [title, deskripsi, deadline, id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.massage });
    }
}));
router.delete('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query('delete from tasks where taks_id = $1', [id]);
        res.json({ message: 'Data berhasil dihapus' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
