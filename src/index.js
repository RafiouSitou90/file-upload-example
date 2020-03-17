const express = require('express');
const dotenv = require('dotenv').config();
const routes = require('./routes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

/**
 * Database connection
 */
mongoose
	.connect(process.env.DATABASE_MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(
		() => {
			console.log('Connected to database successfully');
		},
		err => {
			console.log(err);
		}
	);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.listen(3000, () => {
	console.log(`Server up and listen on port ${process.env.APP_PORT || 3000}`);
});
