from django.test import TestCase, Client
import json
from .models import User


class UserTestCase(TestCase):
    dump_user = {'username': 'chris', 'email': 'chris@gmail.com', 'password': 'chris'}
    dump_user_json = json.dumps(dump_user)

    @staticmethod
    def get_csrf(client):
        response = client.get('/api/user/token/')
        return response.cookies['csrftoken'].value

    def signup(self):
        user = User.objects.create_user(username=self.dump_user["username"], email=self.dump_user["email"],
                                        password=self.dump_user["password"])
        self.assertEqual(user.__str__(), self.dump_user["username"])

    def signin(self, client):
        path = '/api/user/signin/'
        response = client.post(path, self.dump_user_json, content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/user/', self.dump_user_json,
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        response = client.delete('/api/user/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_signup(self):
        client = Client()
        path = '/api/user/'

        # 405 test (PUT, DELETE)
        response = client.delete(path)
        self.assertEqual(response.status_code, 405)

        # 400 test
        response = client.post(path, json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # 201 test (request successfully)
        response = client.post(path, self.dump_user_json, content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # 400 test (duplicated username)
        response = client.post(path, self.dump_user_json, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_get_authentication(self):
        client = Client()
        path = '/api/user/'

        # 201 test (get authentication before login)
        response = client.get(path)
        self.assertEqual(response.status_code, 200)
        self.assertTrue("false" in response.content.decode())

        self.signup()
        self.signin(client)
        # 201 test (get authentication before login)
        response = client.get(path)
        self.assertEqual(response.status_code, 200)
        self.assertTrue("true" in response.content.decode())

    def test_signin(self):
        client = Client()
        path = '/api/user/signin/'

        # 405 test
        response = client.get(path)
        self.assertEqual(response.status_code, 405)

        # 400 test
        response = client.post(path, json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # 401 test (before sign up)
        response = client.post(path, self.dump_user_json, content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # 204 test (request successfully)
        self.signup()
        response = client.post(path, self.dump_user_json, content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_signout(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = '/api/user/signout/'

        # 405 test
        response = client.post(path, data=None, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put(path, data=None, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, data=None, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401 test (before login)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)  # Pass csrf protection

        # 204 test (request successfully)
        self.signup()
        self.signin(client)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)  # Pass csrf protection

    def test_get_user_list(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = '/api/user/users/'

        # 405 test (PUT, DELETE, POST)
        response = client.post(path, data=None, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put(path, data=None, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, data=None, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)  # Pass csrf protection
