module.exports = {
  apps: [
    {
      name: 'template-vue3-3901',
      script: './app.js',
    },
  ],
  deploy: {
    production: {
      'user': 'root',
      'host': '101.200.179.232',
      'ref': 'origin/main',
      'repo': 'git@github.com:xsrole/template-vue3.git',
      'path': '/usr/www/template-vue3',
      'post-deploy': 'pnpm i && pnpm run build && PORT=3901 pm2 start',
    },
  },
}
