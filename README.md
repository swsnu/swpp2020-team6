# ROTUS: Roadmap to Study

branch       | Travis | Sonarcloud | Coveralls |
------------ | ---- | ---- | ----
master       | [![Build Status](https://travis-ci.org/swsnu/swpp2020-team6.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team6) | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team6&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team6) | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team6/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team6?branch=master)
dev  |  [![Build Status](https://travis-ci.org/swsnu/swpp2020-team6.svg?branch=dev)](https://travis-ci.org/swsnu/swpp2020-team6) |  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team6&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team6)  | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team6/badge.svg?branch=dev)](https://coveralls.io/github/swsnu/swpp2020-team6?branch=dev)

:rotating_light: Coveralls are not being updated due to some error

### Frontend

##### Run

```shell
cd ./frontend
yarn install && yarn start
```

##### Testing (Not yet)

```shell
yarn test --coverage --watchAll=false
```



### Backend

##### Run

```shell
cd ./backend
pip install -r requirements.txt
python3 manage.py makemigrations user roadmap section task tag comment
python3 manage.py migrate

python3 manage.py runserver	
```

##### Testing

```shell
coverage run --source="./user/","./roadmap/","./section/","./task/","./tag/","./comment/" --omit='manage.py','*/__init__.py','backend/*' manage.py test
```

