git add .
git commit -m "deploy"
git push heroku master --force
heroku logs --tail