#!/usr/bin/env node
/**
 * 注入管理员密码到 admin/index.html
 * 使用方式: node scripts/inject-admin-password.js
 * 密码通过环境变量 ADMIN_PASSWORD 传入
 */

const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, '../admin/index.html');
const password = process.env.ADMIN_PASSWORD || 'changeme';

let content = fs.readFileSync(adminPath, 'utf8');

// 替换注入点
const injectedContent = content.replace(
  "const ADMIN_PASSWORD = 'INJECTED_PASSWORD';",
  `const ADMIN_PASSWORD = '${password}';`
);

fs.writeFileSync(adminPath, injectedContent);
console.log(`Admin password injected: ${password.substring(0, 3)}***`);
