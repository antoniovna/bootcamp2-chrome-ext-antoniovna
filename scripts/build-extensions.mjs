import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const distDir = 'dist';

console.log('Iniciando o build da extensão...');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);

const filesToCopy = ['manifest.json'];
const dirsToCopy = ['src', 'icons'];

for (const file of filesToCopy) {
  fs.copyFileSync(file, path.join(distDir, file));
}
for (const dir of dirsToCopy) {
  fs.cpSync(dir, path.join(distDir, dir), { recursive: true });
}

console.log('Arquivos da extensão copiados para dist/');

const output = fs.createWriteStream(path.join(distDir, 'extension.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } 
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(distDir, false); 

await archive.finalize();

console.log(`Build finalizado! Pacote criado em ${distDir}/extension.zip`);