#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 获取命令行参数
const args = process.argv.slice(2);
const projectName = args[0] || 'my-admin-app';

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`),
};

// 递归复制目录
function copyDir(src, dest, exclude = []) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // 跳过排除的文件/目录
    if (exclude.some(pattern => srcPath.includes(pattern))) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 主函数
async function createProject() {
  const templateDir = __dirname;
  const targetDir = path.resolve(process.cwd(), projectName);

  // 检查目标目录是否已存在
  if (fs.existsSync(targetDir)) {
    log.warn(`目录 ${projectName} 已存在`);
    process.exit(1);
  }

  log.info(`\n🚀 创建 Vue3 Admin 项目: ${colors.bright}${projectName}${colors.reset}\n`);

  // 排除不需要复制的文件和目录
  const exclude = [
    'node_modules',
    '.git',
    'dist',
    '.DS_Store',
    'cli.js',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
  ];

  // 复制模板文件
  log.info('📦 复制项目文件...');
  copyDir(templateDir, targetDir, exclude);
  log.success('✓ 项目文件复制完成\n');

  // 更新 package.json 中的项目名称
  const pkgPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.name = projectName;
    // 移除 bin 字段（脚手架项目不需要）
    delete pkg.bin;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    log.success('✓ package.json 已更新\n');
  }

  // 输出安装说明
  log.success('🎉 项目创建成功！\n');
  log.info('接下来执行以下命令:\n');
  console.log(`  ${colors.bright}cd ${projectName}${colors.reset}`);
  console.log(`  ${colors.bright}npm install${colors.reset}`);
  console.log(`  ${colors.bright}npm run serve:rspack${colors.reset}\n`);
  log.info('happy coding! 🎨\n');
}

createProject().catch(err => {
  console.error(err);
  process.exit(1);
});
