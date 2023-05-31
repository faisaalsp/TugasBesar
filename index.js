import path from 'path';
import express from 'express';

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Port ${PORT} is Ready!`);
});
app.set('view engine','ejs');
app.use(express.static(path.resolve('public')));

app.get('/',async (req,res) =>{
    res.render('login')
});

app.get('/homeadmin', async (req,res) => {
    res.render('homeAdmin')
});

app.get('/managemember', async (req,res) => {
    res.render('manageMemberAdmin')
});