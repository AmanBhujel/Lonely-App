# Lonely App - How to Use
Welcome to Lonely App! Features of Lonely app:

- Integrated OpenAI API for chat functionality.
- Stored chat history in the database for AI learning.
- Implemented emotional analysis using Hume AI during calls.
- Integrated OpenAI Voice API for voice interactions.
- Used Annyang for speech-to-text conversion.
- Used Cronjob and Nodemailer to send emails for the scheduled therapy or goal.

**Tech-stacks and packages used:**
- React
- Tailwind
- Express
-Nodemailer
- Cronjob
- Annyang(for speech to text)
- Firebase(for google auth)
- MongoDb 

### Installation
Clone the repository to your local machine:
```bash    
git clone <github-Repo-Link>
Change into the project directory:
cd lonely-forked
```

### Install dependencies using npm:
```bash
npm install
```

### Setting up Environment Variables:

Create a .env file in the root of the project and add the following environment variables:
```bash
REACT_APP_HUME_AI_API=your_hume_ai_api_key
REACT_APP_OPEN_AI_API_KEY=your_open_ai_api_key

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=firebase_sender_id
REACT_APP_FIREBASE_APP_ID=firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=firebase_measurement_id
 ```

### Running the App
After completing the installation, you can start the development server using:
   
        npm start

### Setting up backend:
Go to backend directory and install node packages:
```bash
cd backend
npm install
```

### Setting up Environment Variables:

Create a .env file in the root of the project and add the following environment variables:
```bash
MONGO_URL = your_mongoDb_url
JWT_SECRET = your_jwt_secret
MAIL_USER=your_email_address
MAIL_PASS=your_app_password_for_email
```

### Start backend server:

Start frontend and backend separately. To run backend, go inside backend directory and run:
```bash
nodemon index
```
