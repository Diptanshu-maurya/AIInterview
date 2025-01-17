const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


 export const chatSession = model.startChat({
    generationConfig,
    // history: [
    //   {
    //     role: "user",
    //     parts: [
    //       {text: "Job position :Full stack developer ,Job Description: Reactjs ,nodejs ,mysql ,years of experience:6 . On the basis of this information plz give the 5 interview question with some hint and then answer in json format. give question,Hint and answer as field "},
    //     ],
    //   },
    //   {
    //     role: "model",
    //     parts: [
    //       {text: "```json\n[\n  {\n    \"question\": \"Describe your experience with building and deploying a full-stack application using ReactJS, Node.js, and MySQL.  Walk us through a specific project, highlighting the challenges you faced and how you overcame them.\",\n    \"hint\": \"Focus on a project that showcases your skills in all three technologies. Mention specific technologies used within each layer (e.g., specific React libraries, Node.js framework, database design choices).  Emphasize problem-solving and teamwork.\",\n    \"answer\": \"In my previous role at Acme Corp, I led the development of a real-time e-commerce platform.  The front-end was built using ReactJS with Redux for state management and Material-UI for component styling.  The backend utilized Node.js with Express.js as the framework, and we used MySQL for the database.  One major challenge was optimizing database queries to handle high traffic during peak sales periods. We addressed this by implementing caching strategies using Redis and optimizing database indexes.  Another challenge involved ensuring data consistency across multiple microservices. We solved this using a message queue (RabbitMQ) to handle asynchronous communication between services. The project was successfully deployed using Docker and Kubernetes, resulting in a 30% increase in user engagement.\"\n  },\n  {\n    \"question\": \"Explain your understanding of RESTful APIs and how you would design an API for a specific feature within a hypothetical application (e.g., user authentication, product catalog).\",\n    \"hint\": \"Focus on HTTP methods (GET, POST, PUT, DELETE), status codes, and API design principles (e.g., resource-based URLs, consistent responses).\",\n    \"answer\": \"A RESTful API uses HTTP methods to interact with resources. For example, in a user authentication system, a POST request to `/users/login` would handle user login, returning a token upon success (200 OK).  A GET request to `/users/me` (protected by the token) would retrieve user details. A PUT request to `/users/me` would allow users to update their profile.  Error responses would use appropriate HTTP status codes (e.g., 401 Unauthorized, 404 Not Found).  I strive for consistency in URLs and response formats for maintainability and ease of use by client applications.\"\n  },\n  {\n    \"question\": \"How do you handle errors and exceptions in your Node.js applications?  Describe your approach to logging and debugging.\",\n    \"hint\": \"Mention error handling middleware, try-catch blocks, logging libraries (e.g., Winston, Bunyan), and debugging tools (e.g., Node Inspector, Chrome DevTools).\"\n    ,\n    \"answer\": \"I use a combination of techniques to handle errors. In my Node.js applications, I use Express.js middleware for centralized error handling. This allows me to catch errors, log them appropriately, and return consistent error responses to the client.  Inside individual routes or functions, I use try-catch blocks to handle synchronous exceptions. For asynchronous operations (promises, async/await), I handle rejections using `.catch()`.  I utilize a structured logging library like Winston to record detailed information about errors, including timestamps, error messages, stack traces, and request details. This helps in debugging and monitoring application health.  For debugging, I use Node.js debugger and logging tools to identify the root cause of issues effectively.\"\n  },\n  {\n    \"question\": \"Explain your experience with database optimization in MySQL.  How would you approach optimizing a slow query?\",\n    \"hint\": \"Discuss indexing, query optimization techniques (e.g., EXPLAIN PLAN), database normalization, and query profiling tools.\",\n    \"answer\": \"Database optimization is critical for performance. I have experience with optimizing slow queries in MySQL.  My first step is to use the `EXPLAIN` command to analyze the query execution plan. This helps identify bottlenecks, such as missing indexes or inefficient join operations. I then work on adding appropriate indexes to the database tables.  I also ensure proper database normalization to reduce data redundancy and improve query performance.  Sometimes, query rewriting is necessary to improve efficiency.  For example, using subqueries effectively or replacing full table scans with indexed lookups.  Furthermore, I make use of MySQL’s profiling tools to identify recurring performance issues and monitor query execution time.\"\n  },\n  {\n    \"question\": \"Describe your experience with version control using Git.  How do you handle merging conflicts and collaborate with other developers?\",\n    \"hint\": \"Discuss branching strategies (e.g., Gitflow), pull requests, code reviews, and conflict resolution techniques.\",\n    \"answer\": \"I am proficient in using Git for version control. I typically use a branching strategy like Gitflow, creating feature branches for new developments and pull requests for code reviews before merging into the main branch.  This approach allows for parallel development and ensures code quality through collaborative review.  When merging conflicts arise, I carefully examine the changes in both branches, prioritize the changes and resolve the conflicts using a merge tool or manually editing the conflicting sections.  Effective communication with other developers is key to resolving conflicts efficiently and maintaining a consistent codebase.\"\n  }\n]\n```\n"},
    //     ],
    //   },
    // ],
  });

 


