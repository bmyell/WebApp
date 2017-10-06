#!/bin/bash
printf "What is your commit this time?  -> "
read content
git add .
git commit -m "$content"
git push origion master
echo "git push successful!"

