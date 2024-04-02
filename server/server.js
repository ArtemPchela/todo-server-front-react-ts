import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3001;
const messagesFile = "./messages.json";
const viewsFile = "./views.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Increment view count and return the updated count
app.post("/views", async (req, res, next) => {
  try {
    const data = await fs.readFile(viewsFile);
    const viewsData = JSON.parse(data);
    viewsData.views += 1; // Increment the view count
    await fs.writeFile(viewsFile, JSON.stringify(viewsData, null, 2)); // Write the updated count back to the file
    res.json(viewsData); // Return the updated view count
  } catch (err) {
    next(err);
  }
});

// Retrieve the current view count without incrementing
app.get("/views", async (req, res, next) => {
  try {
    const data = await fs.readFile(viewsFile);
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});

// Read messages
app.get("/messages", async (req, res, next) => {
  try {
    const data = await fs.readFile(messagesFile);
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});

// Add a new message
app.post("/messages", async (req, res, next) => {
  try {
    const newMessage = req.body;
    newMessage.id = uuidv4();
    const data = await fs.readFile(messagesFile);
    const messages = JSON.parse(data);
    messages.push(newMessage);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
    res.status(201).send("Message added.");
  } catch (err) {
    next(err);
  }
});

// Update a message
app.patch("/messages/:id", async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const updatedContent = req.body;
    const data = await fs.readFile(messagesFile);
    let messages = JSON.parse(data);
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex !== -1) {
      messages[messageIndex].content = updatedContent.content;
      await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
      res.send("Message updated.");
    } else {
      res.status(404).send("Message not found.");
    }
  } catch (err) {
    next(err);
  }
});

// Delete a message
app.delete("/messages/:id", async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const data = await fs.readFile(messagesFile);
    let messages = JSON.parse(data);
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex !== -1) {
      messages.splice(messageIndex, 1);
      await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
      res.send("Message deleted.");
    } else {
      res.status(404).send("Message not found.");
    }
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
