
import express from 'express';
import tasksroute from './routes/taskroutes';
import taskuser from './routes/taskuser'
const app = express();

app.use(express.json());
app.use('/api', tasksroute,taskuser);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});