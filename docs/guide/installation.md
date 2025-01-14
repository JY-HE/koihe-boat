# 安装

## 命令安装

可以通过 `npm`、`yarn` 或 `pnpm` 进行安装。

```bash
# 通过 npm 安装
npm i @koihe/boat-ui

# 通过 yarn 安装
yarn add @koihe/boat-ui

# 通过 pnpm 安装
pnpm add @koihe/boat-ui
```

## CDN安装

在页面上引入 `js` 和 `css` 文件即可开始使用。

```bash
# 引入样式
<link rel="stylesheet" href="https://unpkg.com/@koihe/boat-ui/dist/index.css">

# 引入组件库
<script src="https://unpkg.com/@koihe/boat-ui/dist/index.js"></script>
```


## Hello world

通过 `CDN` 的方式我们可以很容易地使用 `BoatUI` 写出一个页面。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/@koihe/boat-ui/dist/index.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Try BoatUI</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://unpkg.com/@koihe/boat-ui/dist/index.js"></script>
        <script>
            const app = Vue.createApp({
                template: `
                            <div>
                                <boat-button type="primary" plain>BoatUI</boat-button>
                            </div>
                        `,
                });
            app.use(BoatUI);
            app.mount('#app');
        </script>
    </body>
</html>
```

如果是通过 npm 安装，请阅读下一节：[快速开始](./quickstart.md)
