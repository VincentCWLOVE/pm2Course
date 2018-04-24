# pm2Course

> 涉及到的知识点 `express` `pm2` `mongoose` `jwt` `SSO`等 

### 环境搭建

```bash
# 安装 express
npm install express-generator -g
# 安装 pm2
npm install pm2 -g
# 安装 MongoDB
# 根据自己的操作系统安装MongoDB ------->https://www.mongodb.com/download-center?jmp=nav#community


### 程序编写

```bash
mkdir pm2Course
cd pm2Course
pm2 ecosystem
express -e appname
#或者用你的开发工具打开ecosystem.config.js
vim ecosystem.config.js
pm2 start ecosystem.config.js --watch 
#开启MongoDB数据库服务
mongod --fork --dbpath /Users/vincent/Desktop/pm2/PM2/gdhongmiaoDB/db --logpath /Users/vincent/Desktop/pm2/PM2/gdhongmiaoDB/logs/mongodb.log

#安装程序依赖
cd appname
npm install bcrypt --save
npm install jsonwebtoken --save
npm install mongoose --save



 
 
