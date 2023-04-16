module.exports = {
    apps: [
        {
            name: '1zap_front',
            exec_mode: 'cluster',
            instances: '1',
            script: 'npm',
            args: 'start',
            // env_dev: {
            //     NODE_ENV: 'development',
            // },
            // env_prod: {
            //     NODE_ENV: 'production',
            // },
        },
    ],

    // Deployment Configuration
    deploy: {
        production: {
            user: 'root',
            host: ['185.217.131.180'],
            ref: 'origin/main',
            repo: 'git@github.com:azertyDev/1zap.git',
            path: '/opt/1zap',
            // 'pre-deploy-local': '',
            // 'post-deploy': 'sh nextjs-pm2-deploy.sh',
            'post-deploy':
                'npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save',
            // 'pre-setup': '',
        },
    },
};
