"""
Declare and manage the Users database.
The User database is defined with the following parameters:
    email as type String,
    user's name as type String,
    user's image as type String,
    user's home country as type String,
"""

from app import DB


class UserData(DB.Model):
    """ Declare the User database with the necessary parameters """
    email = DB.Column(DB.String(100), primary_key=True)
    name = DB.Column(DB.String(80), unique=False, nullable=False)
    image = DB.Column(DB.String(150), unique=True, nullable=False)
    country = DB.Column(DB.String(50), unique=False, nullable=True)

    def __repr__(self):
        """ Return the User's name """
        return '<User %r>' % self.name
