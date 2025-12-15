# 📦 Breakable Toy I - Inventory Management System

A robust, full-stack Inventory Management System designed to handle product operations, stock tracking, and real-time metrics.

This project demonstrates a **Clean Architecture** approach, implementing **SOLID principles** in the backend and a **Context-driven** state management system in the frontend.

---

## 🚀 Tech Stack

### Backend (API)
* **Java**
* **Spring Boot** (Web, DevTools)
* **Maven** (Build Tool)
* **Layered Architecture** (Controller - Service - Repository)

### Frontend (Client)
* **React**
* **TypeScript**
* **Vite**
* **ShadCN UI** & **Tailwind CSS**
* **Axios** (Service Layer)
* **Context API** (State Management)

---

## 🏗️ Architecture Overview

This project moves away from monolithic patterns to a modular, scalable design.

### Backend: Layered Architecture
The Spring Boot application is divided into three distinct layers to ensure **Separation of Concerns (SoC)**:
1.  **Controller Layer:** Handles HTTP requests and response formatting. It delegates business logic to the Service layer.
2.  **Service Layer:** Contains all business rules, validations, and metric calculations. It uses **Java Streams** for efficient data processing.
3.  **Repository Layer:** Abstraction for data persistence (currently In-Memory, adaptable to JPA).

### Frontend: Context & Adapter Pattern
The React application decouples UI from Logic:
1.  **Service Layer (`productService.ts`):** Implements an **Adapter Pattern** to map Backend DTOs (e.g., `productName`) to Frontend Interfaces (e.g., `name`), ensuring type safety and preventing `any` types.
2.  **Context Provider (`ProductContext`):** Centralizes the state (Products, Metrics, Filters, Pagination). It eliminates prop-drilling.
3.  **Components:** Divided into "Smart" Containers (`ProductSection`, `MetricsSection`) that consume the Context, and "Dumb" UI components (`Table`, `Dropdowns`) that simply render data.

---

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:
* **Java Development Kit (JDK)** or higher.
* **Node.js** (v18 or higher) & **npm**.
* **Maven** (optional, wrapper included).

---

## ⚡ How to Run

To run the full stack application, you need two terminal instances.

### 1. Backend (Spring Boot)
The backend runs on **port 9090** to avoid conflicts with the frontend.

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Run the application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    *Alternatively, if you have the wrapper:* `./mvnw spring-boot:run`

> **Success:** You should see `Tomcat started on port(s): 9090` in the console.

### 2. Frontend (React)
The frontend uses Vite and runs on **port 8080** (default).

1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies (first time only):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run start
    ```
    *(Note: This is an alias for `vite dev`)*

> **Success:** Click the link shown in the terminal (usually `http://localhost:8080`) to open the app.

---

## 📂 Project Structure

```text
root/
├── backend/
│   ├── src/main/java/com/breakableToy/demo/
│   │   ├── Config/          # CORS Configuration
│   │   ├── Controller/      # REST Endpoints
│   │   ├── Service/         # Business Logic
│   │   ├── Repository/      # Data Access
│   │   ├── Entities/        # Domain Models
│   │   └── DTO/             # Data Transfer Objects
│   └── application.properties # Server Port: 9090
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BToyParts/   # App specific components (Sections, Dropdowns)
    │   │   └── ui/          # ShadCN reusable components
    │   ├── context/         # ProductProvider (Global State)
    │   ├── services/        # Axios & Adapters
    │   ├── types/           # TypeScript Interfaces
    │   └── pages/           # Layouts
    └── package.json         # Scripts
