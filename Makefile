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
endef

RESOURCES := resources/jquery.js

SPRINTBACKLOGBURNER_RESOURCES = backlog-burner.js backlog-burner.css 

$(eval $(call subproject,SprintBacklogBurner))

buildall: $(PROJECTS)
	
testall: 
	open tst/index.html
