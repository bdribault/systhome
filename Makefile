pylint:
	find . -name \*.py -not -path '*/venv/*' | xargs pylint --rcfile .pylintrc --load-plugins pylint_django -j 2 || true
coverage:
	coverage run --source='.' manage.py test
	coverage report