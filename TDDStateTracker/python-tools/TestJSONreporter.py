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
        jsonstring=self.reporter.createReport(self.test_results)
        jsondata=json.loads(jsonstring)
        self.assert_(jsondata["passed"], 'jsondata "passed" was not True: %s ' % jsondata["passed"])
        
if '__main__' == __name__:
    unittest.main()
