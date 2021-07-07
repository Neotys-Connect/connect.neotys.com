REPOS=$(curl -s -L -H "Accept: application/vnd.github.v3+json" https://api.github.com/orgs/Neotys-Connect/repos | jq '.[]|.full_name' -r)

for repo in $REPOS; do
  if [ "$repo" != "Neotys-Connect/connect.neotys.com" ]; then
    echo "Repo: $repo"
  fi
done
