module.exports = {
    apps: [
        {
            name: '1zap_front',
            script: 'npm',
            args: 'start',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_prod: {
                NODE_ENV: 'production',
            },
        },
    ],

    // Deployment Configuration
    deploy: {
        production: {
            user: 'root',
            host: ['185.217.131.180:22'],
            ref: 'origin/main',
            repo: 'git@github.com:azertyDev/1zap.git',
            path: '/opt/1zap_front',
            'pre-deploy-local': '',
            'post-deploy': 'sh nextjs-pm2-deploy.sh',
            // 'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};
