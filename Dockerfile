# Node.js
FROM node:16

# /app 디렉토리 생성
RUN mkdir -p /app

# /app 디렉토리 WORKDIR 로 설정
WORKDIR /app

# package.json과 package-lock.json 파일 이미지로 복사
COPY package*.json ./

# COPY 결과 확인
RUN ls

# npm 의존성 설치
RUN npm install

# 모든 파일 복사
COPY ./ ./

# COPY 결과 확인
RUN ls

ENTRYPOINT ["/bin/sh", "-c", "/bin/bash"]
#CMD ["npm", "run", "build"]
#CMD ["npm", "run", "start"]

