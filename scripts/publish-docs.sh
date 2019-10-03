echo "------------------------------------"
echo "Publishing Compodocs to Github Pages"

pushd ..
git subtree push --prefix documentation origin gh-pages

echo ""
echo "------------------------------------"
echo "Compodocs published to Github Pages"
