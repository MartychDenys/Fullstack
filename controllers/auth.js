const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const candidate = await User.findOne({email: email});

    if (candidate) {
       //  Нашли кандидата, проверка пароля
        const passwoRdresult = bcrypt.compareSync(password, candidate.password); // сравниваем пароли в синхронном режиме
        if (passwoRdresult) {
            // Генерация токена, пароли совпали
            // первый параметр обьект { email: candidate.email, userId: candidate._id} который мы хотим зашифровать в токен
            // второй параметр - это ключь который позволяет генерировать данный токен
            // третий параметр - время жизни токена указываеться через {}
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});


            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают.'
            })
        }

    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
};

module.exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const candidate = await User.findOne({email: email});

  if (candidate) {
    // Пользователь существует
      res.status(409).json({
          message: 'Такой email уже занят'
      })
  } else {
    // Добавляем нового пользователя
      // Добавляем хеширование для пароля
      const salt = bcrypt.genSaltSync(10);
      const user = new User({
          email: email,
          password: bcrypt.hashSync(password, salt)
      });

      // Вслучаи какой-то ошибки при сохранении
      try {
        await user.save();
        res.status(201).json(user);
      } catch (err) {
          // Обрабатываем ошибку

      }
  }
};