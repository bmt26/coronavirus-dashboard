""" Program to run server-side mocked test cases """

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import add_user_to_db, models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_EMAIL = "testuser@gmail.com"
INITIAL_NAME = "Test User"
INITIAL_IMAGE = "testimage.com/testimage.jpg"
INITIAL_COUNTRY = "None"

class AddUserDBTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {'email': "jeh37@njit.edu", 'name': "John Houlihan", 'image': "https://nerdist.com/wp-content/uploads/2020/07/maxresdefault.jpg"},
                KEY_EXPECTED: [
                    {
                        'email': "testuser@gmail.com",
                        'name': "Test User",
                        'image': "testimage.com/testimage.jpg",
                        'country': "None"
                    },
                    {
                        'email': "jeh37@njit.edu",
                        'name': "John Houlihan",
                        'image': "https://nerdist.com/wp-content/uploads/2020/07/maxresdefault.jpg",
                        'country': "None"
                    },
                ]
            }
        ]

        initial_user = models.UserData(email=INITIAL_EMAIL, name=INITIAL_NAME, image=INITIAL_IMAGE, country=INITIAL_COUNTRY)
        self.initial_db_mock = [initial_user]

    def mocked_db_session_add(self, data):
        self.initial_db_mock.append(data)

    def mocked_db_session_commit(self):
        pass

    def mocked_user_query_all(self):
        return self.initial_db_mock

    def test_add_user_to_db_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.UserData.query') as mocked_query:
                        mocked_query.all = self.mocked_user_query_all
                        
                        print(self.initial_db_mock)
                        actual_result = add_user_to_db(test[KEY_INPUT])
                        print("ACTUAL")
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(self.initial_db_mock)
                        print("EXPECTED")
                        print(expected_result)
                        
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()