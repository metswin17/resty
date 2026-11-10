
# RESTy — Lab 26 UML Diagram

```mermaid
flowchart TD
    A["App (Class Component)"]
    H["Header (Function)"]
    F["Form (Function)"]
    R["Results (Function)"]
    FT["Footer (Function)"]

    A -->|Renders| H
    A -->|handleApiCall prop| F
    F -->|Form submission callback| A
    A -->|data prop| R
    A -->|Renders| FT
```
