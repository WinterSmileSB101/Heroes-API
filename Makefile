test:
	mongoimport --jsonArray --db test --collection heroes --drop --file ./test/fixtures/heroes.json
	./node_modules/.bin/mocha

cov test-cov:
	./node_modules/.bin/istanbul cover _mocha

.PHONY: test cov test-cov
