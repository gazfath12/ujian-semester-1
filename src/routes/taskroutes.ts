
import { Router } from 'express';
import pool from '../db/db';

const router = Router();

router.post('/todo', async (req, res) => {
    const { title, description, deadline,} = req.body;
    const userId = 1; // Default user_id untuk testing
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description,  deadline, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title,description,  deadline,userId]
        );
        res.status(201).json({ status: "success", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
});
router.get('/todo', async (req, res) => {
    try {
        const result = await pool.query('select * from tasks')
        res.json(result.rows)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
});
router.get('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM tasks WHERE task_id = $1`, [id]);
        res.json(result.rows[0]);
        res.status(200).json({ status: 'success', data: result.rows[0] });
    } catch (error:any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
router.put('/todo/:id', async (req, res) => {
    const { id } = req.params;  // Mengambil ID dari URL
    const { title, description, deadline, is_completed } = req.body;  // Mengambil data baru dari body request

    try {
        const result = await pool.query(
            `UPDATE tasks 
             SET title = $1, description = $2, deadline = $3, is_completed = $4, updated_at = now() 
             WHERE task_id = $5 
             RETURNING *`,
            [title, description, deadline, is_completed, id]
        );

        // Jika tugas ditemukan dan berhasil diperbarui, mengembalikan hasilnya
        if (result.rows.length > 0) {
            res.status(200).json({ status: 'success', data: result.rows[0] });
        } else {
            res.status(404).json({ status: 'error', message: 'Task not found' });
        }
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('delete from tasks where task_id = $1', [id])
        res.json({ message: 'Data berhasil dihapus' });
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})

export default router;
