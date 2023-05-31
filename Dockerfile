# Node.js
FROM node:16

# 모든 파일 복사
COPY ./ ./

# npm 의존성 설치
RUN npm install

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]

