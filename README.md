# Class Online

### You can access the live version of this project [here](https://class-online.herokuapp.com/).

This is a simple web app that lets you take your classes online.

The app uses React for the frontend.
The app uses Express, MongoDB for the backend.
The app uses LocalStorage of the browser to persist the JWT.
The app uses Heroku.com for hosting the Express server.
The app uses MongoDB Atlas for hosting the MongoDB database.
The app uses Mailgun for sending emails.
The app uses S3 for storing video files.

---
To use this application locally, follow the next steps.

```
echo "
MONGO_URI=mongodb://localhost:27017/classonline
PORT=5000
MAILGUN_DOMAIN_NAME=<MAILGUN_DOMAIN_NAME>
MAILGUN_API_KEY=<MAILGUN_API_KEY>
MAILGUN_FROM=\"Class Online <class@online.mailgun.org>\"
JWT_SECRET=jwtsecret
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
AWS_S3_BUCKET_NAME=<AWS_S3_BUCKET_NAME>
" > .env

Few more things to keep in mind:
- Make sure that the S3 bucket is public. Each file in this bucket will be publicly accessible. Apis will fail if the bucket is not public.
- Preferably, create a separate user in AWS IAM with access only to this public bucket, and give the credentials of this user in the above AWS access key id and AWS secret access key.
- Mailgun domain name can be found in their portal. Life side menu -> Sending -> Domains.
- Mailgun api key can be found in top right user icon -> API Keys -> Private API Key
- Remember to increase nginx file upload limit -> https://stackoverflow.com/a/26717238/10345461
- pm2 can be used to host this.
- Also, MAILGUN_FROM takes a particular format (as given above). Keep this format. If you are using export command to set the environment variable, you can just do export MAILGUN_FROM='ABC XYZ <email id>' or export MAILGUN_FROM='"ABC XYZ" <email id>' (whatever works.)

cd client
yarn install

cd ..
yarn install
yarn dev
```
---
### You can access the live version of this project [here](https://class-online.herokuapp.com/).

#### Thanks!!
