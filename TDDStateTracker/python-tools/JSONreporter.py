# JSONreporter.py
#

import unittest, json
__author__ = 'jautero'

class JSONreporter:
    def createReport(self,testreport):
        testdata={"passed": True}
        return json.dumps(testdata)

