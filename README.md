# swpp2020-team6



### Frontend

##### Run

```shell
cd ./frontend
yarn install & yarn start
```

##### Testing

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



### [개발 전 필수] git commit message template 설정ㄴ

```shell
# 템플릿 설정
git config commit.template ./.gitmessage.txt

# 템플릿을 사용해서 commit
git commit 
```

