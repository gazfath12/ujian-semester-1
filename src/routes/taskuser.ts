import { Router } from 'express';
import pool from '../db/db';

const router = Router();

router.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO santri (username, email, password, created_at now()) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password]
        );
        res.json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/usersi/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password,  } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3,  update_at now() WHERE id = $5 RETURNING *',
            [username, email, password, id]
        );
        res.json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: 'Data berhasil dihapus' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;