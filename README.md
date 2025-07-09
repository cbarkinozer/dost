# dost: Your Open-Source, Self-Hostable, and Unrestricted AI Chat Companion

**dost** (Turkish for "friend") is an open-source, self-hostable web UI for Large Language Models (LLMs), built for privacy, flexibility, and a 100% open-source future. It is inspired by the feature-richness of platforms like Open WebUI but is committed to remaining truly open and community-driven under the permissive **MIT License**, forever.

This project was born out of the belief that powerful AI tools should be accessible to everyone without proprietary restrictions or branding clauses. `dost` is for developers, hobbyists, and organizations who want full control over their AI interactions and data.

![Dost Project Banner](https://placehold.co/1200x630/1e293b/a5b4fc/png?text=dost&font=raleway)

## Core Philosophy

*   **Truly Open & Unrestricted:** Licensed under MIT. No clauses, no exceptions. You can fork, modify, rebrand, and use `dost` for any purpose, commercial or personal.
*   **Backend-Agnostic:** Designed to connect to a variety of LLM providers, including Ollama, OpenAI-compatible APIs (like Groq, Fireworks, or local servers), and more.
*   **Full Data Ownership:** Self-host everything. Your conversations, user data, and settings stay on your infrastructure.
*   **Community-Driven:** Built with the community, for the community. Contributions, suggestions, and forks are highly encouraged.

---

## Core Features (Roadmap Goals)

-   ✅ **Rich Chat Interface:** A clean, responsive, and intuitive UI with full Markdown, LaTeX, and code syntax highlighting.
-   ✅ **Multi-Model Support:** Seamlessly switch between different LLM models for any conversation.
-   ✅ **Streaming & Real-time Responses:** See the model "think" with real-time token streaming.
-   ✅ **Retrieval-Augmented Generation (RAG):**
    -   **Document Chat:** Upload PDFs, TXT, and other files to chat with your documents.
    -   **Web Search:** Augment conversations with real-time web search results.
-   ✅ **Persistence & Chat History:** All conversations are saved to a database and linked to user accounts.
-   ✅ **User Authentication:** Secure, multi-user system with user registration and login.
-   ✅ **Tools & Function Calling:** A framework for giving models access to external tools (e.g., calculators, APIs).
-   ✅ **Image Generation:** Integrate with models like DALL-E or Stable Diffusion.
-   ✅ **Easy Deployment:** Fully containerized with Docker for a simple, one-command setup.

---

## Technology Stack & Architecture

`dost` uses a modern, decoupled architecture that separates the user interface from the backend logic. This allows for scalability and lets us use the best tools for each job.

```
+------------------------+      +-------------------------+      +-----------------------+
|   Frontend (Client)    |      |    Backend API Server   |      |   External Services   |
|   (SvelteKit + Vite)   |      |     (Python + FastAPI)  |      |                       |
+------------------------+      +-------------------------+      +-----------------------+
| - UI Components        |      | - /api/chat (streaming) | <--> | - Ollama              |
| - State Management     |      | - /api/users (auth)     | <--> | - OpenAI API          |
| - Real-time Updates    |      | - /api/rag (documents)  | <--> | - Groq, Fireworks etc.|
+------------------------+      | - /api/tools            |      +-----------------------+
        |                       | - Auth Middleware       |                  ^
        |                       | - RAG Logic             |                  |
        |                       +-------------------------+                  |
        v                                     |                              |
[ Browser ]                                   v                              |
                                  +-----------------------+                  |
                                  |   Database Storage    | -----------------+
                                  | (PostgreSQL+PGVector) |
                                  +-----------------------+
                                  | - Users, Roles        |
                                  | - Conversations       |
                                  | - Vector Embeddings   |
                                  +-----------------------+
```

*   **Frontend:**
    *   **Framework:** [SvelteKit](https://kit.svelte.dev/)
    *   **Language:** [TypeScript](https://www.typescriptlang.org/)
    *   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    *   **State Management:** Svelte Stores
*   **Backend:**
    *   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
    *   **Language:** [Python 3.11+](https://www.python.org/)
    *   **Data Validation:** [Pydantic](https://docs.pydantic.dev/)
*   **Database:**
    *   **Primary:** [PostgreSQL](https://www.postgresql.org/) for relational data (users, chats).
    *   **Vector Store:** [PGVector](https://github.com/pgvector/pgvector) extension for efficient similarity search in RAG.
    *   **Migrations:** [Alembic](https://alembic.sqlalchemy.org/en/latest/) for database schema management.
*   **Containerization:**
    *   **Orchestration:** [Docker Compose](https://docs.docker.com/compose/) for easy local development and deployment.

---

## The Development Roadmap: A Step-by-Step Plan

This project is broken down into logical, achievable phases. We will build from the ground up, ensuring a solid foundation at each step.

### ✅ **Phase 0: Project Foundation (You are here!)**
-   [x] Initialize `dost` SvelteKit project.
-   [x] Set up `.gitignore`.
-   [x] Create this detailed `README.md` as our project blueprint.
-   [ ] **Next Step:** Set up the monorepo structure with `frontend` and `backend` directories.

---

### ⏳ **Phase 1: The Backend Foundation (API & Database)**
**Goal:** Create a running FastAPI backend server that can connect to a database.
-   [ ] **1.1:** Create a `backend` directory and set up a Python virtual environment.
-   [ ] **1.2:** Install FastAPI, Uvicorn, SQLAlchemy, Alembic, psycopg2-binary, and python-dotenv.
-   [ ] **1.3:** Create a basic FastAPI app with a root `/` endpoint that returns `{"message": "Dost Backend is running"}`.
-   [ ] **1.4:** Configure database connection using environment variables.
-   [ ] **1.5:** Set up Alembic for database migrations. Create the first migration for `users` and `conversations` tables.

---

### ⏳ **Phase 2: Core Chat API (No Streaming)**
**Goal:** Create the first API endpoint that can receive messages and get a non-streaming response from an LLM.
-   [ ] **2.1:** Create Pydantic models for chat requests and responses.
-   [ ] **2.2:** Create a `/api/v1/chat` `POST` endpoint that accepts a list of messages.
-   [ ] **2.3:** Implement a simple, hardcoded call to an OpenAI-compatible API (like Ollama's) using the `requests` or `httpx` library.
-   [ ] **2.4:** The endpoint should return the complete LLM response once it's fully generated.
-   [ ] **2.5:** Add logic to save the user message and the assistant's response to the database.

---

### ⏳ **Phase 3: The Frontend Foundation (SvelteKit)**
**Goal:** Set up the SvelteKit frontend with basic structure and styling.
-   [ ] **3.1:** Create a `frontend` directory and move the SvelteKit files into it.
-   [ ] **3.2:** Install and configure Tailwind CSS.
-   [ ] **3.3:** Create the main layout in `src/routes/+layout.svelte` with a sidebar and a main content area.
-   [ ] **3.4:** Create placeholder components: `src/lib/components/Sidebar.svelte`, `src/lib/components/ChatWindow.svelte`.

---

### ⏳ **Phase 4: Building the Static Chat UI**
**Goal:** Develop the visual components for the chat interface using dummy data.
-   [ ] **4.1:** `src/lib/components/chat/MessageBubble.svelte`: Component to display a single message (user or assistant). Style it.
-   [ ] **4.2:** `src/lib/components/chat/MessageHistory.svelte`: Component to display an array of `MessageBubble`s.
-   [ ] **4.3:** `src/lib/components/chat/ChatInput.svelte`: The text area and send button.
-   [ ] **4.4:** Assemble these components in `src/routes/+page.svelte` and populate with a hardcoded array of messages to perfect the look and feel.

---

### ⏳ **Phase 5: The First Connection (MVP)**
**Goal:** Connect the frontend to the backend to create a working, non-streaming chat application.
-   [ ] **5.1:** Set up a proxy in `vite.config.ts` to forward frontend `/api` requests to the backend FastAPI server to avoid CORS issues in development.
-   [ ] **5.2:** In `+page.svelte`, manage the chat state (the array of messages) using a Svelte store.
-   [ ] **5.3:** When the user sends a message, make a `fetch` call from the frontend to the backend's `/api/v1/chat` endpoint.
-   [ ] **5.4:** On receiving the full response, add the assistant's message to the chat state to update the UI.

---

### ⏳ **Phase 6: Real-time Streaming**
**Goal:** Make the assistant's response appear token-by-token.
-   [ ] **6.1: Backend:** Modify the `/api/v1/chat` endpoint to make a streaming request to the LLM and return a FastAPI `StreamingResponse`.
-   [ ] **6.2: Frontend:** Refactor the `fetch` call to handle a `ReadableStream`.
-   [ ] **6.3: Frontend:** As tokens arrive, append them to the last message in the chat state, creating the "typing" effect.

---

### ⏳ **Phase 7: Persistence & Chat History**
**Goal:** Allow users to have multiple conversations and switch between them.
-   [ ] **7.1: Backend:** Create API endpoints: `GET /conversations`, `POST /conversations`, `GET /conversations/[id]`.
-   [ ] **7.2: Frontend:** In the `Sidebar.svelte` component, fetch and display the list of conversations.
-   [ ] **7.3: Frontend:** Implement dynamic routing. Create a `src/routes/c/[id]/+page.svelte` route.
-   [ ] **7.4: Frontend:** Clicking a conversation in the sidebar should navigate to its page and load its message history.

---

### ⏳ **Phase 8: User Authentication**
**Goal:** Add a secure, multi-user system.
-   [ ] **8.1: Backend:** Integrate JWT (JSON Web Tokens) for authentication. Add `password` hashing (e.g., with `passlib`).
-   [ ] **8.2: Backend:** Create `/auth/register`, `/auth/login`, and `/auth/me` endpoints.
-   [ ] **8.3: Backend:** Protect API endpoints; associate conversations with a `user_id`.
-   [ ] **8.4: Frontend:** Create `Login` and `Register` pages.
-   [ ] **8.5: Frontend:** Store the JWT in a secure cookie. Use a `+layout.server.ts` or hooks to manage user state and protect routes.

---

### ⏳ **Phase 9: The Configurable Model System**
**Goal:** Allow connecting to different models and endpoints.
-   [ ] **9.1: Backend:** Design a configuration system (e.g., a `models.yaml` file) to define available models, their API endpoints, and types (e.g., `openai`, `ollama`).
-   [ ] **9.2: Backend:** Refactor the chat logic to be a generic "endpoint handler" that routes requests to the correct LLM based on the conversation's settings.
-   [ ] **9.3: Frontend:** Add a model selector dropdown to the chat interface, populated from a new `/api/v1/models` endpoint.
-   [ ] **9.4: Backend/Frontend:** Store the selected `model_id` with each conversation.

---

### ⏳ **Phase 10: RAG - Document Upload & Processing**
**Goal:** Implement the backend foundation for chatting with documents.
-   [ ] **10.1: Backend:** Add PGVector extension to the PostgreSQL Docker setup.
-   [ ] **10.2: Backend:** Install necessary Python libraries: `pypdf`, `sentence-transformers`, `langchain`.
-   [ ] **10.3: Backend:** Create a file upload endpoint (`/api/v1/documents`).
-   [ ] **10.4: Backend:** Implement a processing pipeline: on upload, extract text, split it into chunks, generate embeddings using `sentence-transformers`, and store the vectors in the database.
-   [ ] **10.5: Backend:** Modify the chat endpoint: if a document is referenced, perform a similarity search to retrieve relevant chunks and inject them into the LLM's context.

---

### ⏳ **Phase 11: RAG - Frontend Integration**
**Goal:** Build the UI for the document RAG feature.
-   [ ] **11.1: Frontend:** Create a "Documents" section or library where users can upload and manage files.
-   [ ] **11.2: Frontend:** Add a button in the `ChatInput` to attach a document to the current conversation.
-   [ ] **11.3: Frontend:** Display which documents are being used as context for a conversation.

---

### ⏳ **Phase 12: RAG - Web Search**
**Goal:** Augment conversations with live web search results.
-   [ ] **12.1: Backend:** Integrate a web search library (e.g., `duckduckgo-search`).
-   [ ] **12.2: Backend:** Implement a "pre-processing" step for chat. If a "web search" flag is enabled, the backend first generates a search query from the user's prompt, executes the search, and injects the results into the context for the final LLM call.
-   [ ] **12.3: Frontend:** Add a "Web Search" toggle switch to the UI.
-   [ ] **12.4: Frontend:** Display search results or status indicators to the user.

---

### ⏳ **Phase 13: UI/UX Polish & Settings**
**Goal:** Add quality-of-life features and user settings.
-   [ ] **13.1:** Create a `/settings` page for user profile management.
-   [ ] **13.2:** Implement light/dark theme toggle.
-   [ ] **13.3:** Add features like "copy message," "regenerate response," and "edit message."
-   [ ] **13.4:** Create a comprehensive `docker-compose.yml` for easy production deployment.

---

## Contributing

Contributions are the lifeblood of open source. If you're excited about the vision for `dost`, your help is welcome! Please feel free to open an issue to discuss a bug or feature, or submit a pull request.

## License

This project is distributed under the **MIT License**. See the `LICENSE` file for more information. You are free to use, modify, and distribute this software for any purpose, with no requirement to preserve branding.
