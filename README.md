# ROTUS: Roadmap to Study
[![Build Status](https://travis-ci.com/swsnu/swpp2020-team6.svg?branch=master)](https://travis-ci.com/swsnu/swpp2020-team6)  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team6&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team6) [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team6/badge.svg?branch=setting/coveralls)](https://coveralls.io/github/swsnu/swpp2020-team6?branch=setting/coveralls)

### Frontend

##### Run

```shell
cd ./frontend
yarn install & yarn start
```

##### Testing (Not yet)

```shell
yarn test --coverage --watchAll=False
```



### Backend

##### Run

```shell
cd ./backend
pip install -r requirements.txt
python3 manage.py runserver	
```

##### Testing

```shell
coverage run --source='.' manage.py test
```



### [개발 전 필수] git commit message template 설정

```shell
# 템플릿 설정
git config commit.template ./.gitmessage.txt

# 템플릿을 사용해서 commit
git commit 
```

