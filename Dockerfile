# Node.js
FROM node:16

# /app 디렉토리 생성
RUN mkdir -p /app

# /app 디렉토리 WORKDIR 로 설정
WORKDIR /app

# package.json과 package-lock.json 파일 이미지로 복사
COPY package*.json ./

# npm 의존성 설치
RUN npm install

# 모든 파일 복사
COPY ./ ./

# 빌드
RUN npm run build

# prisma 환경 구성
npx prisma generate

# 실행
CMD ["npm", "start"]

