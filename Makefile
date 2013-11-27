# Makefile for Agile-Tools
# 
# 

.PHONY: all buildall testall
all: buildall testall

define subproject
PROJECTS += $(1)
.PHONY: $(1)
$(1): RESOURCE_VARNAME := $$(shell echo $(1)_resources | tr 'a-z' 'A-Z') 
$(1): BUILDDIR := build/$(1)
$(1): TARGET_RESOURCE_FILES := $$(addprefix $(1)/,$$($(shell echo $(1)_resources | tr 'a-z' 'A-Z')))
$(1): $(1)/index.html $$(TARGET_RESOURCE_FILES) $$(RESOURCES)
	mkdir -p $$(BUILDDIR)/resources
	cp $$< $$(BUILDDIR)
	cp $$(TARGET_RESOURCE_FILES) $$(RESOURCES) $$(BUILDDIR)/resources
#$(1)-test: $$($(1)_SRC)
#	open file:tst/index.html?module=$(1)
endef

RESOURCES := resources/jquery.js

SPRINTBACKLOGBURNER_RESOURCES = backlog-burner.js backlog-burner.css 

$(eval $(call subproject,SprintBacklogBurner))

VIRTUALPLANNINGPOKERDECK_RESOURCES = ppdeck.js ppdeck.css

$(eval $(call subproject,VirtualPlanningPokerDeck))

TDDSTATETRACKER_RESOURCES = tdd-state-tracker.js tdd-state-tracker.css

$(eval $(call subproject,TDDStateTracker))

WORKBREAKDOWNSAMPLER_RESOURCES = work-breakdown-sampler.js

$(eval $(call subproject,WorkBreakdownSampler))

buildall: $(PROJECTS)
	
testall: 
	open tst/index.html
