# TestJSONreporter.py Python unittest reporter that generates report in JavaScript
#
# Copyright (c) 2013 Juha Autero
#

import unittest
import JSONreporter

class TestJSONreporter(unittest.TestCase):
    def test_create(self):
        reporter=JSONreporter.JSONreporter()
