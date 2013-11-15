# TestJSONreporter.py Python unittest result that generates report in JavaScript
#
# Copyright (c) 2013 Juha Autero
#

import unittest, json
import JSONreporter

class TestJSONreporter(unittest.TestCase):
    def setUp(self):
        self.reporter=JSONreporter.JSONreporter()
        self.test_results=unittest.TestResult()
    def test_empty_results(self):
        jsondata=self.reporter.createReport(self.test_results)
        self.assertEqual([], json.loads(jsondata), 'jsondata "%s" was not expected')
        
if '__main__' == __name__:
    unittest.main()
