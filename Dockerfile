# 使用較小的 node:22-alpine 映像
FROM node:22-alpine

# 安裝系統相依
RUN apk update && apk add --no-cache \
    build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /opt/app

# 先複製 package 檔，減少快取失效
COPY package*.json ./

# 只安裝 production 依賴
RUN npm ci --only=production

# 複製所有原始碼與 .env
COPY . .

# 若有 .env 檔案需一併複製（通常已經在專案內）
# COPY .env .env

# 預設權限
RUN chown -R node:node /opt/app

# 建置前端內容
RUN npm run build

USER node

EXPOSE 1337

# 用 start 而非 develop（正式環境）
CMD ["npm", "start"]
