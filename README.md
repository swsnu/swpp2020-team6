# ROTUS: Roadmap to Study
> https://rotus.shop/

branch       | Travis | Sonarcloud | Coveralls |
------------ | ---- | ---- | ----
dev  |  [![Build Status](https://travis-ci.org/swsnu/swpp2020-team6.svg?branch=dev)](https://travis-ci.org/swsnu/swpp2020-team6) |  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team6&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team6)  | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team6/badge.svg?branch=dev)](https://coveralls.io/github/swsnu/swpp2020-team6?branch=dev)

## How to Run

#### 1. Clone this repository
```
git clone https://github.com/swsnu/swpp2020-team6.git
```

#### 2. Prepare basic environment
These steps assume you have a Linux 18.04 LTS machine.
All commands for backend assume an activated virtualenv.
##### (1) installing requirements for frontend
```
sudo apt-get install npm
npm install -g yarn
cd frontend
yarn install (if not working, "yarn install --ignore-engines")
```
##### (2) preparing virtualenv
```
sudo apt-get install python3-virtualenv
pip install virtualenv
virtualenv --python=python3.7 rotus-env
source rotus-env/bin/activate
```
##### (3) installing requirements for backend
```
sudo apt-get install python3.7-dev default-libmysqlclient-dev
cd backend
pip install -r requirements.txt
python3 manage.py makemigrations user roadmap section task tag comment
python3 manage.py migrate
```

#### 3. Run Frontend and Backend
In `swpp2020-team6/frontend`,
```
yarn start
```
In `swpp2020-team6/backend`,
```
python3 manage.py runserver
```

## Testing
In `swpp2020-team6/frontend`,
```
yarn test --coverage --watchAll=false
```
In `swpp2020-team6/backend`,
```
coverage run --source="./user/","./roadmap/","./section/","./task/","./tag/","./comment/" --omit='manage.py','*/__init__.py','backend/*','utils/*' manage.py test --settings=backend.settings.ci && coverage report
```

## Demo Video
[https://youtu.be/zZkiPKhb_Yc](https://youtu.be/zZkiPKhb_Yc)

## Wiki
You can refer to our [wiki](https://github.com/swsnu/swpp2020-team6/wiki) for detailed information.
