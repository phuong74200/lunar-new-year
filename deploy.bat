git add .
git commit -m "deploy"
git push heroku master
heroku logs --tail