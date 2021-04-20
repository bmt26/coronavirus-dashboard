""" Program to run server-side unmocked test cases """

import unittest
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import get_state_statistics, get_country_statistics

COUNTRY_INPUT = "username"
EXPECTED_OUTPUT = "expected"

class GetStateStatistics(unittest.TestCase):
    """ Class to test the API and ensure proper state statistics """
    def setUp(self):
        """ Function to declare user input and expected output """
        self.success_test_params = [
            {
                COUNTRY_INPUT: "France",
                EXPECTED_OUTPUT: ['', 'French Guiana', 'French Polynesia', 'Guadeloupe', 'Martinique', 'Mayotte', 'New Caledonia', 'Reunion', 'Saint Barthelemy', 'Saint Pierre and Miquelon', 'St Martin', 'Wallis and Futuna']
            },
        ]

    def test_get_state_statistics_success(self):
        """ Function to check that actual result matches expected result """
        for test in self.success_test_params:
            actual_result = get_state_statistics(test[COUNTRY_INPUT])
            expected_result = test[EXPECTED_OUTPUT]

            self.assertEqual(actual_result, expected_result)

class GetCountryStatistics(unittest.TestCase):
    """ Class to test the API and ensure proper country statistics """
    def setUp(self):
        """ Function to declare user input and expected output """
        self.success_test_params = [
            {
                EXPECTED_OUTPUT: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
                'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh',
                'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
                'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
                'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
                'Congo (Brazzaville)', 'Congo (Kinshasa)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
                "Côte d'Ivoire", 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
                'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
                'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
                'Haiti', 'Holy See (Vatican City State)', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic of',
                'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Korea (South)',
                'Kuwait', 'Kyrgyzstan', 'Lao PDR', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
                'Lithuania', 'Luxembourg', 'Macedonia, Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
                'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia, Federated States of', 'Moldova',
                'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand',
                'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestinian Territory', 'Panama', 'Papua New Guinea', 'Paraguay',
                'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Kosovo', 'Romania', 'Russian Federation', 'Rwanda',
                'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
                'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
                'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland',
                'Syrian Arab Republic (Syria)', 'Taiwan, Republic of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand',
                'Timor-Leste', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates',
                'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela (Bolivarian Republic)',
                'Viet Nam', 'Yemen', 'Zambia', 'Zimbabwe']
            },
        ]

    def test_get_state_statistics_success(self):
        """ Function to check that actual result matches expected result """
        for test in self.success_test_params:
            actual_result = get_country_statistics()
            expected_result = test[EXPECTED_OUTPUT]

            self.assertEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()