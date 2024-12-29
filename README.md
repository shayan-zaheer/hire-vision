# HireVision

## Overview
This application is designed to streamline job searching and management through a dual-interface system:
- **User Side:** An AI-powered chatbot integrated with WhatsApp to provide job listings, accept CVs, and answers related to other queries.
- **Admin Side:** A Next.js-powered web application for managing job listings and candidate submissions.

## Features

### Chatbot (User Side)
- **AI Integration:** Uses Google Gemini API, Hugging Face, and Pinecone for intelligent job recommendations.
- **WhatsApp Connectivity:** Powered by Meta for seamless communication.
- **Dynamic Interactions:** 
  - Presents job listings as polls.
- **Redis Memory:** Maintains chat history for improved user interactions.

### Admin Panel
- **Authentication:** Secure login via Google or GitHub using `passport.js`.
- **Job Management:** Add, update, and delete job listings.
- **CV Handling:** Organize and view submitted CVs.

## Technology Stack
- **Frontend:** Next.js
- **Backend:** Node.js
- **AI Libraries:** 
  - Google Gemini API
  - Hugging Face
  - Pinecone
- **Chat Integration:** WhatsApp Business API
- **Database:** MongoDB (MongoDB Compass for management)
- **State Management:** Redis (for chatbot memory)

## Architecture
The application follows a **microservices architecture**:
- Chatbot and Admin Panel run as separate services on different ports, ensuring scalability and fault isolation.
