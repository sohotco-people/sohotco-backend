# Node.js
FROM node:16

# package.json과 package-lock.json 파일 이미지로 복사
COPY package*.json ./

# npm 의존성 설치
RUN npm install

# 모든 파일 복사
COPY ./ ./


ENTRYPOINT ["/bin/sh", "-c", "/bin/bash"]
#CMD ["npm", "run", "build"]
#CMD ["npm", "run", "start"]

