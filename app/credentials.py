# -*- coding: utf-8 -*-

from os import path

class Credentials(object) :
    """
    Fast access to mongo connection url through cached property
    Load from credential file
    And also i didn't want to have this stuff in my document file
    """

    url_cache = None
    URL_FILE = './credentials'

    def load_db_url(self):
        
        if not path.isfile(self.URL_FILE):
            raise Exception('credential file is missing')

        with open(self.URL_FILE, 'r') as fp:
            self.url_cache = fp.read()
            return self.db_url

    @property
    def db_url(self):
        return self.url_cache or self.load_db_url()


if __name__ == '__main__':

    # cache test
    doc = Credentials()
    print(doc.db_url)
    doc.URL_FILE = '/dev/null'
    print(doc.db_url)