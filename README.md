# Message Board Application


This Message Board Application is a full-stack project built with React and Express, featuring a simple, user-friendly interface for posting, updating, and deleting messages. It also tracks and displays the view count of the message board.

## Features

### React Frontend:

* Post new messages via a text input form.
* Update existing messages.
* Delete messages.
* Display the total number of views for the message board.

### Express Backend:

* REST API endpoints to create, read, update, and delete messages.
* Endpoint to increment and fetch the view count.
* Simple file-based persistence using JSON files.
* Getting Started
* Prerequisites
* Node.js installed on your machine.
* Basic knowledge of React and Express.

## Installation

### Clone the repository:

```bash
git clone https://github.com/ArtemPchela/todo-server-front-react-ts.git
```
### Install dependencies for the server:

```bash
cd path/to/todo-react-ts-vite/server

npm install
```

### Install dependencies for the React app:

```bash
cd path/to/todo-react-ts-vite/client

npm install
```

## Running the Application

### Start the Express server:

```bash
npm start
```

* The server will run on http://localhost:3001.

### In a new terminal, start the React application:

```bash
cd path/to/your-project/client

npm start
```

* The application will open in your browser at http://localhost:5174/.

## Usage

* The application's homepage displays a text area for entering new messages and a list of existing messages.
To post a new message, type in the text area and click the "Send Message" button.
Each message has "Edit" and "Delete" options for managing messages.
The view count at the top updates with each new visit to the page.
* API Endpoints
  * GET /messages: Fetch all messages.
  * POST /messages: Post a new message. Requires a JSON body with a content field.
  * PATCH /messages/:id: Update an existing message by ID. Requires a JSON body with a content field.
  * DELETE /messages/:id: Delete a message by ID.
  * POST /views: Increment the view count.
  * GET /views: Fetch the current view count.

## Contributing

Contributions to the Message Board Application are welcome. Please feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details.

## Feel free to adjust the content as necessary to better fit your project's needs or to add any additional 
sections you think are relevant.
