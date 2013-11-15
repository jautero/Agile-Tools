# TestJSONreporter.py Python unittest result that generates report in JavaScript
#
# Copyright (c) 2013 Juha Autero
#

import unittest
import JSONreporter

class TestJSONreporter(unittest.TestCase):
    def setUp(self):
        self.reporter=JSONreporter.JSONreporter()
        self.test_results=unittest.TestResult()
    def test_empty_results(self):
        json=self.reporter.createReport(self.test_results)
        self.assertIs(json,"")
