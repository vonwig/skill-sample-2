## Important files

| File | Use |
| :--- | :-- |
| skill.yaml | metadata defining the skill |
| Dockerfile | build the image that will be used to handle the subscription or webhook payload |
| package.json/package-lock.json | this Dockerfile uses Node to handle the payload |
| datalog/subscription/*.edn | subscription definitions |
| index.js | event handler |
 
 
