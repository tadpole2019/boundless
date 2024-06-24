import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import { fileURLToPath } from 'url';
import cors from 'cors';
// import router 匯入路由
import indexRouter from './routes/index.js'
import jamRouter from './routes/jam.js'
import lessonRouter from "./routes/lesson.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// 設定允許互動的網域，讓port 3000  和 5500間可以互動
const whitelist = [
	'http://localhost:3005',
    'http://localhost:3000',
	undefined,
];
const corsOptions = {
	credentials: true,
	origin(origin, callback) {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('不允許傳遞資料'));
		}
	},
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用路由
app.use('/', indexRouter);
app.use('/api/jam', jamRouter);
app.use("/api/lesson", lessonRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set("view engine", "ejs");

export default app;
