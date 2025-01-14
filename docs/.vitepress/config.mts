import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Boat UI',
    description: 'Front-end UI component library for Vue3',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '开发指南', link: '/guide/installation' },
            { text: '组件', link: '/components/overview' },
        ],

        sidebar: {
            '/guide/': [
                {
                    text: '开发指南',
                    items: [
                        { text: '安装', link: '/guide/installation' },
                        { text: '快速开始', link: '/guide/quickstart' },
                    ],
                },
            ],
            '/components/': [
                {
                    text: 'Overview 组件总览',
                    items: [{ text: 'Overview 组件总览', link: '/components/overview' }],
                },
                {
                    text: '基础组件',
                    items: [
                        { text: 'Button 按钮', link: '/components/button' },
                        { text: 'Icon 图标', link: '/components/icon' },
                    ],
                },
                {
                    text: '通知组件',
                    items: [
                        { text: 'Notification 通知', link: '/components/notification' },
                        {
                            text: 'ProgressNotification 进度通知',
                            link: '/components/progress-notification',
                        },
                    ],
                },
            ],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/JY-HE/koihe-boat' }],
    },
});
