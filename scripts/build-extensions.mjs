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

await new Promise((res, rej) => {
  output.on('close', res)
  archive.on('error', rej)
  archive.pipe(output)
  archive.glob('**/*', {
    cwd: distDir, ignore:
      ['extension.zip']
  });
  archive.finalize()
})