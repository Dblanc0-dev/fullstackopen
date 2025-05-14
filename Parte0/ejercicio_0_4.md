# Ejercicio 0.4 - Full Stack Open

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database

    User->>Browser: Writes a note and presses "Save"
    Browser->>Server: POST /notes with note content
    Server->>Database: Save note
    Database-->>Server: Save confirmation
    Server-->>Browser: Response 201 Created
    Browser-->>User: Display new note on screen
