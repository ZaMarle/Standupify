import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const homeDir = process.env.USERPROFILE || process.env.HOME; // Will work for Windows and UNIX-based systems
if (!homeDir) {
    throw new Error(
        'Environment variable USERPROFILE or HOME is undefined. Cannot find the home directory.',
    );
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync(
                path.join(homeDir, '.ssl', 'localhost-key.pem'),
            ),
            cert: fs.readFileSync(path.join(homeDir, '.ssl', 'localhost.pem')),
        },
        host: 'localhost',
        port: 5173,
    },
});
