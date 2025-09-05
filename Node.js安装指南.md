# Node.js 安装指南

## 安装步骤

### Windows系统

1. **下载Node.js安装包**
   - 访问Node.js官方网站：[https://nodejs.org/](https://nodejs.org/)
   - 下载LTS（长期支持）版本，这是最稳定的版本
   - 点击绿色的"Windows Installer"按钮下载

2. **运行安装程序**
   - 双击下载的.msi文件
   - 勾选"Accept the terms in the License Agreement"
   - 点击"Next"按钮
   - 选择安装位置（建议使用默认位置）
   - 点击"Next"按钮
   - 在"Custom Setup"页面，确保所有组件都被选中
   - 点击"Next"按钮
   - 在"Tools for Native Modules"页面，建议勾选"Automatically install the necessary tools"
   - 点击"Next"按钮
   - 点击"Install"按钮开始安装
   - 安装完成后，点击"Finish"按钮

3. **验证安装**
   - 打开命令提示符（CMD）或PowerShell
   - 输入以下命令验证Node.js是否安装成功：
     ```
     node -v
     ```
   - 输入以下命令验证npm（Node包管理器）是否安装成功：
     ```
     npm -v
     ```

## 运行测试文件

我已经为您创建了一个测试文件`node_test.js`，您可以按照以下步骤运行它：

1. 打开命令提示符（CMD）或PowerShell
2. 导航到文件所在目录：
   ```
   cd C:\Users\LENOVO\.trae\La Rive Gauche
   ```
3. 运行测试文件：
   ```
   node node_test.js
   ```
4. 如果一切正常，您将看到一条欢迎消息和当前时间，并且一个简单的Web服务器将在http://localhost:3000启动
5. 打开浏览器并访问http://localhost:3000查看测试页面  
6. 按Ctrl+C停止服务器

## 常见问题解决

1. **如果命令提示符显示"'node'不是内部或外部命令..."**
   - 这表示Node.js没有正确添加到系统PATH中
   - 尝试重新启动计算机
   - 如果问题仍然存在，请重新安装Node.js并确保在安装过程中选择"Add to PATH"选项

2. **如果安装过程中出现错误**
   - 确保您有管理员权限
   - 尝试关闭杀毒软件，然后重新安装
   - 尝试使用不同版本的Node.js

3. **如果测试文件无法运行**
   - 确保您在正确的目录中
   - 确保文件名拼写正确
   - 检查是否有语法错误

## 下一步

安装成功后，您可以：

1. 学习Node.js基础知识
2. 探索npm包管理器
3. 尝试构建简单的Web应用程序
4. 学习Express.js框架

祝您学习愉快！