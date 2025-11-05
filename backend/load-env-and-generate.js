require('dotenv').config({ path: '../DB/.env' });
const { exec } = require('child_process');

exec('npx prisma generate', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
});
