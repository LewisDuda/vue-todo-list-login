set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/LewisDuda/vue-todo-list-login.git master:gh-pages

cd -