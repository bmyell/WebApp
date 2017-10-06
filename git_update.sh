#!/bin/bash
printf "What is your commit this time?  -> "
read content
git add .
git commit -m "$content"
git push origin master
echo "git push successful!"

