#!/bin/bash
printf "What is your commit this time?  -> "
read content
git add .
git commit -m "$content"
echo "git push successful!"

