# Node.js
FROM node:16

# Node.js 애플리케이션 폴더 생성
RUN mkdir -p /app

# /app을 작업 workdir로 지정
WORKDIR /app

# package.json과 package-lock.json 파일 이미지로 복사
COPY package*.json ./

# npm 의존성 설치
RUN npm install


# 모든 파일 복사
COPY ./ ./

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]

