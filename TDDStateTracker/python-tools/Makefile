
all: tests

resources:
	-mkdir -p resources

resources/jquery.js: ../../resources/jquery.js resources
	cp $< $@

RESOURCE_FILES += resources/jquery.js
	
resources/tdd-state-tracker.js: ../tdd-state-tracker.js resources
	cp $< $@
	
RESOURCE_FILES += resources/tdd-state-tracker.js

resources/tdd-state-tracker.css: ../tdd-state-tracker.css resources
	cp $< $@
	
RESOURCE_FILES += resources/tdd-state-tracker.css

build: $(RESOURCE_FILES)

tests: build
	python TestJSONReporter.py
	#open index.html