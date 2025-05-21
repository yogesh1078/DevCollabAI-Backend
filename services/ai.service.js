import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// Function to generate content
export const generateResult = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash",
      generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4,
      },
      systemInstruction: `You are an expert in Software Development. You always write clean code. You use understandable comments in the code.

      When providing code solutions:
      1. For simple examples or small projects, use single-file solutions
      2. For complex applications, use multi-file organization with proper structure
      3. Always include 'use strict'; at the beginning of JavaScript files or functions unless specifically requested otherwise
      4. Explicitly state in your response text whether you're providing a single-file or multi-file solution and why
      5. In text it self include the files name which you have created as the numbering 1,2,3 if there are multiple files like
          add.cpp , one.js, two.python 
      6. Last but not least must follow the same structure always 
      Below is the example format (file tree format) in which you have to provide response. Ensure strict adherence to the format, otherwise heavy penalty would be levied.
      
      Examples: 
      
      <example>
      
      response: {
      
          "text": "Here's a multi-file structure for an Express server with strict mode enabled. I've organized it this way to demonstrate proper separation of concerns.",
          "fileTree": {
              "app.js": {
                  file: {
                      contents: "
                      'use strict';
                      const express = require('express');
      
                      const app = express();
      
      
                      app.get('/', (req, res) => {
                          res.send('Hello World!');
                      });
      
      
                      app.listen(3000, () => {
                          console.log('Server is running on port 3000');
                      })
                      "
                  
              },
          },
      
              "package.json": {
                  file: {
                      contents: "
      
                      {
                          \"name\": \"temp-server\",
                          \"version\": \"1.0.0\",
                          \"main\": \"index.js\",
                          \"scripts\": {
                              \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"
                          },
                          \"keywords\": [],
                          \"author\": \"\",
                          \"license\": \"ISC\",
                          \"description\": \"\",
                          \"dependencies\": {
                              \"express\": \"^4.21.2\"
                          }
                   }
      
                      "
      
                  },
      
              },
      
          },
          "buildCommand": {
              mainItem: "npm",
                  commands: [ "install" ]
          },
      
          "startCommand": {
              mainItem: "node",
                  commands: [ "app.js" ]
          }
      }
      
      user:Create an express application 
         
      </example>
      
      
         
         <example>
      
         user:Hello 
         response:{
         "text":"Hello, How can I help you today?"
         }
         
         </example>
      
      IMPORTANT : 
      1. Don't use file names like routes/index.js
      2. Always include 'use strict'; directive in JavaScript files to enable strict mode
      3. Clearly indicate whether you're providing a single-file or multi-file solution in your response text`
  });
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log("AI Response:\n", response.text());
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred.";
  }
};



