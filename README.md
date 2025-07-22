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

## Core Features

*   **Rich & Responsive Interface:** A clean, intuitive UI with full Markdown, LaTeX, and code syntax highlighting. Fully responsive and PWA-enabled.
*   **Advanced Theming:** Includes Light, Dark, and OLED modes, with options for custom backgrounds and system-preference auto-switching.
*   **Multi-Model Support:** Seamlessly switch between different LLM models and adjust parameters (e.g., temperature, seed) for any conversation.
*   **Streaming & Real-time Responses:** See the model "think" with real-time token streaming.
*   **Advanced Chat Management:** Conversation history, searching/filtering, pinning, and branching.
*   **Retrieval-Augmented Generation (RAG):**
    *   **Document Chat:** Upload PDFs, TXT, and other files to chat with your documents.
    *   **Web Search:** Augment conversations with real-time web search results.
*   **Multi-Modal Interaction:**
    *   **Voice I/O:** Support for push-to-talk voice input and text-to-speech (TTS) for responses.
    *   **Image Generation:** Integrate with models like DALL-E or Stable Diffusion.
*   **Tools & Function Calling:** A framework for giving models access to external tools and APIs through a modular and scalable architecture.
*   **Live Artifacts & Jupyter Integration:** Render and interact with HTML/CSS/JS code blocks in real-time; optional integration with a Jupyter backend for code execution.
*   **Secure Multi-User System:**
    *   **User Authentication:** Standard user registration and login.
    *   **Role-Based Access Control (RBAC):** Admin panel for managing users, roles, and permissions.
*   **Easy Deployment:** Fully containerized with Docker for a simple, one-command setup.

---

## Technology Stack & Architecture

`dost` uses a modern, decoupled architecture that separates the user interface from the backend logic. This allows for scalability, security, and lets us use the best tools for each job.

```
+------------------------+      +-------------------------+      +-----------------------+
|   Frontend (Client)    |      |    Backend API Server   |      |   External Services   |
|   (SvelteKit + Vite)   |      |     (Python + FastAPI)  |      |                       |
+------------------------+      +-------------------------+      +-----------------------+
| - UI Components        |      | - /api/chat (streaming) | <--> | - Ollama              |
| - State Management     |      | - /api/users (auth)     | <--> | - OpenAI API          |
| - Real-time Updates    |      | - /api/rag (documents)  | <--> | - Groq, Fireworks etc.|
+------------------------+      | - /api/tools (MCP)      |      +-----------------------+
        |                       | - Auth Middleware       |                  ^
        |                       | - RAG Logic             |                  |
        |                       +-------------------------+                  |
        v                                     |                              |
[ Browser ]                                   v                              |
                                  +-----------------------+                  |
                                  |   Database Storage    | <----------------+ (Optional: MCP Servers)
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
*   **Backend:**
    *   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
    *   **Language:** [Python 3.11+](https://www.python.org/)
    *   **Data Validation:** [Pydantic](https://docs.pydantic.dev/)
*   **Database:**
    *   **Primary:** [PostgreSQL](https://www.postgresql.org/) for relational data (users, chats).
    *   **Vector Store:** [PGVector](https://github.com/pgvector/pgvector) extension for efficient RAG similarity search.
    *   **Migrations:** [Alembic](https://alembic.sqlalchemy.org/en/latest/) for schema management.
*   **Containerization:**
    *   **Orchestration:** [Docker Compose](https://docs.docker.com/compose/) for easy local development and deployment.

---

## The Development Roadmap

This project will be built "UI-first". We will create the entire frontend application using mocked data. Once the user experience is complete and polished, we will build the backend API and swap out the mock data for real API calls.

### **Module 1: Building the Complete Frontend UI**
*Goal: A beautiful, interactive, and feature-rich frontend that feels like a real application, powered entirely by local, mock data.*

*   [ ] **Phase 1: Project & UI Foundation:** Initialize SvelteKit/FastAPI monorepo. Build the static chat UI layout with a sidebar and main content area using Tailwind CSS.
*   [ ] **Phase 2: Core Chat Interactivity:** Implement Svelte stores for state management. Make the chat input functional (add messages, simulate responses) using local state.
*   [ ] **Phase 3: Rich Content & Markdown:** Integrate libraries to render LLM responses with proper Markdown, LaTeX, and code block syntax highlighting.
*   [ ] **Phase 4: Multi-Conversation UI:** Build the UI for managing multiple chats in the sidebar. Implement SvelteKit's dynamic routing (`/c/[id]`) so clicking a conversation navigates to its unique page.
*   [ ] **Phase 5: Advanced Chat Controls UI:** Build the UI components for "Copy", "Regenerate", "Edit", and "Delete" actions and add mock functionality.
*   [ ] **Phase 6: Settings, Documents, and Admin UI:** Create the pages and all UI controls (toggles, forms, tables) for `/settings`, `/documents`, and `/admin` using mocked data.
*   [ ] **Phase 7: Login/Register UI:** Create the authentication pages and forms. A "successful" mock login will simply navigate the user to the main chat page.

### **Module 2: Building the Backend API**
*Goal: A robust, secure, and powerful FastAPI backend that provides all the necessary data and logic for the frontend.*

*   [ ] **Phase 8: Backend & Database Foundation:** Set up the FastAPI server, PostgreSQL with PGVector, and Alembic for migrations. Create the initial `users`, `conversations`, and `messages` tables.
*   [ ] **Phase 9: User Authentication & Chat Persistence API:** Implement JWT-based authentication (`/auth/login`). Create API endpoints for creating, retrieving, and listing conversations associated with the authenticated user.
*   [ ] **Phase 10: Live Chat & Model Streaming API:** Create the first real API endpoint: `/api/v1/chat`. This endpoint will take a message history, connect to a real LLM provider (e.g., Ollama), and stream the response back to the client.
*   [ ] **Phase 11: Document Processing & RAG API:** Implement backend logic for file uploads, text extraction, embedding generation, and storage in PGVector. Create the RAG-enabled chat endpoint that retrieves context before calling the LLM.
*   [ ] **Phase 12: Tools & Function Calling with MCP:** To enable a powerful and extensible tools ecosystem, `dost` will be designed to interact with **Model Context Protocol (MCP) servers**.
    > To integrate MCP capabilities, your backend functions as a central orchestrator with two distinct roles. First, it acts as a server, providing its standard REST API for the frontend running in your browser. When a user prompt requires external action, the LLM responds with a `tool_call` instruction. At this point, the backend switches roles and becomes a client. It makes a network request to your separate, independent MCP Tools Server, which executes the required function (e.g., reading a file or querying a database) and returns the result. The backend then relays this result back to the LLM, which uses the new information to formulate the final, contextual answer for the user. This architecture effectively separates the chat interface from the action-taking tools, creating a modular, secure, and scalable system.

### **Module 3: Connecting Frontend to Backend**
*Goal: Systematically replace all mock data and functions in the SvelteKit app with live calls to the FastAPI backend.*

*   [ ] **Phase 13: Connecting Login & Chat:** Replace the mock authentication with calls to the real `/auth` endpoints. Swap the simulated chat response with a real `fetch` call to the streaming `/api/v1/chat` endpoint.
*   [ ] **Phase 14: Connecting Conversation History:** Rip out the mocked conversation list and replace it with a live API call to fetch the user's real conversations from the database.
*   [ ] **Phase 15: Connecting Documents & Settings:** Wire up the document upload UI to the real file upload endpoint. Make the settings page fetch and save user preferences to the backend.
*   [ ] **Phase 16: Final Polish & Deployment:** Create a final, production-ready `docker-compose.yml` to orchestrate the entire stack. Clean up any remaining mock code, write documentation, and finalize the project.

---

## Contributing

Contributions are the lifeblood of open source. If you're excited about the vision for `dost`, your help is welcome! Please feel free to open an issue to discuss a bug or feature, or submit a pull request.

## License

This project is distributed under the **MIT License**. See the `LICENSE` file for more information. You are free to use, modify, and distribute this software for any purpose, with no requirement to preserve branding.