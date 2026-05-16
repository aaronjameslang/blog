.PHONY: install serve build help clean

help:
	@echo "Available commands:"
	@echo "  make install   - Install dependencies (checks Ruby, Bundler, gems)"
	@echo "  make serve     - Run Jekyll development server"
	@echo "  make build     - Build static site"
	@echo "  make clean     - Remove generated site"
	@echo "  make help      - Show this help message"

pre-install:
	./scripts/pre-install

install: pre-install
	bundle install

serve:
	bundle exec jekyll serve

build:
	bundle exec jekyll build

clean:
	rm -rf _site .jekyll-cache
