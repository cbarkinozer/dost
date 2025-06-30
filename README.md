# dost: An Open-Source AI Chat UI

**dost** is an open-source, SvelteKit-powered web UI for interacting with Large Language Models (LLMs). It is designed to be a flexible, self-hostable, and community-driven alternative to proprietary chat interfaces.

![Dost Project Banner](https://placehold.co/1200x630/1e293b/a5b4fc/png?text=dost&font=raleway)

## About The Project

This project is inspired by the architecture and functionality of advanced chat UIs like HuggingChat. The goal of `dost` is to provide a powerful, open-source foundation (under the MIT License) for developers and enthusiasts to build, customize, and control their own conversational AI experiences.

We believe in the power of open-source and aim to create a tool that is not only functional but also transparent and free from restrictive licensing. `dost` is built for everyone, from hobbyists running local models to developers integrating with powerful cloud APIs.

### Core Philosophy

*   **Open and Unrestricted:** Truly open-source under the MIT license. Forever.
*   **Flexible and Modular:** Connect to a wide array of LLM backends—local or remote.
*   **User-Centric:** A clean, responsive, and intuitive interface for seamless conversations.
*   **Self-Hostable:** Full control over your data and infrastructure.

---

## Technology Stack

`dost` is built with a modern, efficient, and developer-friendly stack.

*   **Framework:** [SvelteKit](https://kit.svelte.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (for storing conversations, settings, etc.)
*   **LLM Integration:**
    *   VLLM Inference Service
    *   OpenAI-compatible APIs (OpenAI, Groq)
    *   Ollama

---

## Project Architecture (High-Level)

The architecture is designed for modularity and extensibility, allowing different components to be developed and upgraded independently.

```
+------------------+      +--------------------+      +-----------------------+
|   Client (UI)    | <--> |   Backend Server   | <--> |   External Services   |
| (SvelteKit)      |      | (SvelteKit Routes) |      |    (LLM Providers)    |
+------------------+      +--------------------+      +-----------------------+
| - ChatWindow     |      | - API Endpoints    |      | - OpenAI API          |
| - ChatMessages   |      |   - /conversation  |      | - VLLM    |
| - ChatInput      |      |   - /settings      |      | - Ollama              |
| - NavMenu        |      | - Auth Hooks       |      | - Llama.cpp           |
| - Settings Pages |      +--------------------+      +-----------------------+
+------------------+                  |
         ^                          |
         |                          |
         v                          v
+------------------+      +--------------------+
| Svelte Stores    |      |  Core Logic        |
| (Frontend State) |      |  (Models/Endpoints)|
+------------------+      +--------------------+
         ^                          |
         |                          |
         v                          v
+-------------------------------------------------+
|   Storage (PostgreSQL)                             |
|   - Conversations, Messages, Users, Settings    |
+-------------------------------------------------+
```

### Message Generation Data Flow

1.  **User Input:** The `ChatInput` component sends the user's message to the backend.
2.  **API Route:** A SvelteKit API route (e.g., `/api/conversation/[id]`) receives the request.
3.  **Authentication & Validation:** Server hooks verify the user and the request.
4.  **Model/Endpoint Selection:** The system selects the appropriate LLM model and its corresponding endpoint based on the conversation's settings.
5.  **Prompt Formatting:** The conversation history is formatted into a specific prompt string using the model's defined template.
6.  **Text Generation:** The formatted prompt is sent to the LLM provider (e.g., OpenAI, VLLM).
7.  **Streaming Response:** The LLM streams tokens back to the SvelteKit backend.
8.  **Stream to UI:** The backend streams these tokens to the client in real-time.
9.  **Display:** The `ChatMessages` component renders the tokens as they arrive.
10. **Persistence:** Once the full response is received, the conversation is saved to PostgreSQL.

---

## Development Roadmap: A Step-by-Step Plan

This roadmap breaks down the project into logical phases. We will tackle one phase at a time.

### ✅ **Phase 0: Initial Project Setup**

*   [x] **Action:** Initialize a new SvelteKit project.
    ```bash
    npm create svelte@latest dost
    ```
*   [x] **Action:** Install and configure Tailwind CSS for styling.
    ```bash
    npx svelte-add@latest tailwindcss
    npm install
    ```
*   [x] **Action:** Set up basic project structure (folders for `components`, `lib/server`, etc.).
*   [x] **Action:** Create this `README.md` file to serve as our project blueprint.

### ⏳ **Phase 1: The Core Chat Interface (MVP)**

**Goal:** Create a working, single-session chat interface that can talk to one hardcoded LLM backend. No database, no user accounts, just a functional chat box.

*   [ ] **Step 1.1: Build the Static UI Layout.**
    *   Create the main layout in `src/routes/+layout.svelte`.
    *   This layout should have a grid with a sidebar for future conversation history and a main area for the chat window.
    *   Use placeholder components for now.

*   [ ] **Step 1.2: Create the Chat Components.**
    *   `src/lib/components/chat/ChatWindow.svelte`: The main container.
    *   `src/lib/components/chat/ChatMessages.svelte`: A component to display a list of messages. Use dummy data (an array of message objects) to style the user and assistant bubbles.
    *   `src/lib/components/chat/ChatInput.svelte`: The text input field and send button.

*   [ ] **Step 1.3: Implement the First Backend Endpoint.**
    *   Create a SvelteKit API route: `src/routes/api/chat/+server.ts`.
    *   This `POST` endpoint will accept a `messages` array.
    *   **Crucially**, it will connect to **one** LLM provider (e.g., an OpenAI-compatible API using `openai-ts`).
    *   Implement **streaming**. The endpoint should return a `ReadableStream` that yields tokens as they are received from the LLM.

*   [ ] **Step 1.4: Frontend-Backend Integration.**
    *   In the main page (`src/routes/+page.svelte`), manage the state of the current chat (the array of messages).
    *   When the user sends a message via `ChatInput`, call the `/api/chat` endpoint.
    *   Process the streamed response from the API and append the tokens to the last message in your message array in real-time. This will make the assistant "type."

### Phase 2: Persistence & Multi-Conversation Support

**Goal:** Save conversations to a database and allow users to have multiple, separate chats.

*   [ ] **Step 2.1: Database Integration.**
    *   Set up PostgreSQL.
    *   Create database schemas/types for `Conversation` and `Message`. A `Conversation` will contain an array of `Messages`.
    *   Establish the DB connection in a server-side utility file (`src/lib/server/db.ts`).

*   [ ] **Step 2.2: API - Conversation Persistence.**
    *   Modify the chat API to save/update the conversation in PostgreSQL after a response is generated.
    *   Create new API endpoints:
        *   `GET /api/conversations`: To list all conversations for a user.
        *   `GET /api/conversation/[id]`: To fetch the messages for a specific conversation.
        *   `POST /api/conversation`: To create a new, empty conversation.

*   [ ] **Step 2.3: UI - Conversation History.**
    *   Create the `src/lib/components/NavMenu.svelte` component.
    *   This component will fetch the list of conversations from `/api/conversations` and display them.
    *   Clicking a conversation should navigate the user to that chat.

*   [ ] **Step 2.4: Dynamic Routing.**
    *   Implement the dynamic route `src/routes/conversation/[id]/+page.svelte`.
    *   This page will use its `+page.server.ts` to load the messages for the specific conversation `id` and pass them to the `ChatWindow`.

### Phase 3: The Flexible Model & Endpoint System

**Goal:** Abstract the LLM connection to support multiple models and providers, configured via environment variables. This is the core of the inspiration project's flexibility.

*   [ ] **Step 3.1: The Configuration System.**
    *   Create a system (`src/lib/server/models.ts`) that reads a `MODELS` environment variable. This variable will be a JSON string defining available models, their parameters, and endpoints.

*   [ ] **Step 3.2: Endpoint Abstraction.**
    *   Define a generic `Endpoint` type/interface. It will be a function that takes messages and parameters and returns a streamed response.
    *   Refactor the hardcoded LLM connection from Phase 1 into the first implementation of this interface (e.g., `src/lib/server/endpoints/openai.ts`).

*   [ ] **Step 3.3: Model & Endpoint Mapping.**
    *   Write the logic that processes the `MODELS` config. For each model definition, it should attach the correct `Endpoint` function based on the endpoint type specified in the config (e.g., `"type": "openai"`).

*   [ ] **Step 3.4: UI - Model Selection.**
    *   Add a dropdown or settings modal where the user can select which model to use for a conversation. This will be populated from the `MODELS` config.
    *   The chosen model ID will be saved with the conversation data.

*   [ ] **Step 3.5: Implement More Endpoints.**
    *   One by one, add more endpoint implementations:
        *   `vllm.ts` for VLLM endpoints.
        *   `ollama.ts` for Ollama.
        *   `llamacpp.ts` for llama.cpp servers.

### Phase 4: Advanced Features

**Goal:** Implement the powerful RAG and Tools features.

*   [ ] **Step 4.1: Web Search (RAG).**
    *   **Backend:** Integrate a web search API (e.g., Serper) and a web scraping library (e.g., Cheerio). Create an embedding model utility (e.g., using `transformers.js`). Create a `runWebSearch` function that takes a query, searches, scrapes, embeds, and returns the most relevant context.
    *   **Frontend:** Add a "Web Search" toggle to the UI. Create a component to display the web search status and results (`OpenWebSearchResults.svelte`).

*   [ ] **Step 4.2: Tools System.**
    *   **Backend:** Define a `Tool` data structure. Create a `runTools` function that can parse a model's request to use a tool, execute the tool's function, and return the result. Start with one simple, built-in tool (like a calculator).
    *   **Frontend:** Create a `ToolUpdate.svelte` component to show that a tool is being used and display its results within the chat message.

### Phase 5: User Experience & Polish

**Goal:** Add user accounts, settings, and other quality-of-life features.

*   [ ] **Step 5.1: Authentication.**
    *   Implement a full authentication system. [SvelteKit-Auth](https://authjs.dev/getting-started/providers/sveltekit) is a good option.
    *   Associate conversations with `userId` instead of just a session ID.

*   [ ] **Step 5.2: Settings & Customization.**
    *   Create a `/settings` page.
    *   Allow users to manage their profile, set a custom system prompt, toggle the theme (light/dark), etc.

*   [ ] **Step 5.3: The "Assistants" Feature.**
    *   This is a capstone feature that combines previous work. An "Assistant" will be a saved configuration that bundles:
        *   A specific model (`modelId`).
        *   A custom preprompt.
        *   A set of enabled tools.
        *   A web search configuration.
    *   Users can create, share, and use these pre-configured assistants.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see the `CONTRIBUTING.md` file for details on our code of conduct and the process for submitting pull requests.

## License

Distributed under the MIT License. See `LICENSE.md` for more information.