# Lonely App - How to Use
Welcome to Lonely App! Here's a quick guide on how to get started:


### Installation
Clone the repository to your local machine:

    
        git clone <github-Repo-Link>
        Change into the project directory:
        cd lonely-forked

### Install dependencies using npm:

          npm install

### Setting up Environment Variables:

Create a .env file in the root of the project and add the following environment variables:
```bash
 REACT_APP_HUME_AI_API=your_hume_ai_api_key
 REACT_APP_OPEN_AI_API_KEY=your_open_ai_api_key
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
