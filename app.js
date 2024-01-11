const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 3000;

const { sequelize } = require('./models'); //sequlize 인스턴스 불러오기

app.use(express.json());
app.use(cors());

app.set('port', process.env.PORT || 3000); //포트 설정

//시퀄라이즈와 데이터베이스 동기화
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  })

app.use(morgan('dev')); //http 요펑 로깅을 위한 미들웨어
app.use(express.static(path.join(__dirname, 'public'))); //public 디렉토리에서 정적 파일 제공
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = require('./routes/user');
app.use('/users', users);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});