import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// 用于加载和本地化语言资源
// 例子：Localize.localize('helloWorld', '张三')

export class Localize {
    private static bundle: { [key: string]: string } = {};

    public static load(locale?: string) {
        const language = locale || vscode.env.language;
        let langFilePath = path.join(__dirname, '..', 'l10n', `bundle.l10n.${language}.json`);

        // 如果找不到特定语言的翻译文件，则回退到英语
        if (!fs.existsSync(langFilePath)) {
            langFilePath = path.join(__dirname, '..', 'l10n', 'bundle.l10n.json');
        }

        try {
            this.bundle = JSON.parse(fs.readFileSync(langFilePath, 'utf-8'));
        } catch (error) {
            console.error('Failed to load language file', error);
            this.bundle = {};
        }
    }

    public static localize(key: string, ...args: any[]): string {
        let message = this.bundle[key] || key; // 找不到 key 时回退到 key 本身
        if (args && args.length > 0) {
            message = message.replace(/\{(\d+)\}/g, (match, index) => {
                return args[index] || match;
            });
        }
        return message;
    }
}

// 初始化时加载一次
Localize.load();