import { existsSync, writeFileSync, readFileSync } from 'node:fs';
if (!existsSync('.env.local')) writeFileSync('.env.local', readFileSync('.env.example'));
let env = readFileSync('.env.local','utf8');
for (const [key, value] of Object.entries({ ADMIN_USERNAME: 'admin', ADMIN_PASSWORD: 'admin', ADMIN_NAME: 'Administrator' })) {
  const line = `${key}=${value}`;
  env = new RegExp(`^${key}=.*$`, 'm').test(env) ? env.replace(new RegExp(`^${key}=.*$`, 'm'), line) : `${env.trimEnd()}\n${line}\n`;
}
writeFileSync('.env.local', env);
writeFileSync('ADMIN-ACCESS.local', `Local admin access\nURL: http://localhost:3000/admin\nUsername: admin\nPassword: admin\n\nChange these credentials before deploying publicly.\n`);
console.log('Local admin credentials set to admin/admin. Run npm run admin:create.');
