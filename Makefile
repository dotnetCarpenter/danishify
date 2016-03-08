DIST_FILES = dist/app.js dist/app.map.js
SRC_FILES = js/app.js js/danishify.js

$(DIST_FILES): $(SRC_FILES)
	@npm run build

