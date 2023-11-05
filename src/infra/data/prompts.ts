import type { Prompt } from "../../domain/entity/prompt";

export const defaultPrompts: Prompt[] = [
  {
    title: "Prompt Generator",
    objectif: "Generate a new prompt for a given context.",
    example: `input: "Create a prompt for a calendar event creation feature."\noutput: {
    title: "Calendar Event Creator",
    objectif: "Create a new calendar event.",
    example: "input: Event Name - Birthday Party, Date - 2023-11-12, Location - Dave's House\noutput: { eventName: 'Birthday Party', date: '2023-11-12', location: "Dave's House" }",
    instruction: "Generate a prompt that will take event details as input and return a structured JSON object representing the event."
  }`,
    instruction:
      "Design a prompt that describes the objective, provides an example, and includes instructions for creating a prompt for a specified feature or task.",
  },
  {
    title: "Resume JSON Formatter",
    objectif: "Format personal information into a structured resume in JSON.",
    example:
      "input: Name - Jane Doe, Profession - Software Engineer, Years of Experience - 5, Education - Master's in Computer Science from MIT output: { 'name': 'Jane Doe', 'profession': 'Software Engineer', 'yearsOfExperience': 5, 'education': 'Master's in Computer Science from MIT' }",
    instruction:
      "Create a prompt that takes personal details and professional attributes as input and converts them into a well-structured JSON resume.",
  },

  {
    title: "Uppercase Converter",
    objectif: "Convert text to uppercase.",
    example: "input: hello world\noutput: HELLO WORLD",
    instruction:
      "Take the provided text and convert all characters to uppercase.",
  },
  {
    title: "Dialogue to JSON Converter",
    objectif:
      "Extract information from dialogue text and convert it into a structured JSON object.",
    example: `input: "Hello, my name is John. I am 30 years old and I live in New York."\noutput: {"name": "John", "age": 30, "location": "New York"}`,
    instruction:
      "Read through the dialogue text, extract relevant pieces of information, and organize them into a structured JSON format. Look for common indicators of information such as introductions for names, expressions of age, and location statements.",
  },
  {
    title: "Whitespace Trimmer",
    objectif: "Trim whitespace from both ends of a string.",
    example: 'input: "  Hello World  "\noutput: "Hello World"',
    instruction:
      "Remove all leading and trailing whitespace from the input string.",
  },
  {
    title: "Sentence Capitalizer",
    objectif: "Capitalize the first letter of each sentence.",
    example:
      "input: this is a test. this is only a test.\noutput: This is a test. This is only a test.",
    instruction:
      "Convert the first character of each sentence in the text to uppercase.",
  },
  {
    title: "Find and Replace",
    objectif: "Replace a specified word in a text with another word.",
    example:
      'input: text: "The quick brown fox", find: "fox", replace: "dog"\noutput: "The quick brown dog"',
    instruction:
      "Search for a specific word in the text and replace it with the provided substitute.",
  },
  {
    title: "Children’s Show Script Creator",
    objectif:
      "Develop a prompt that assists writers in creating a script for a children’s show episode.",
    example: `input: "Create a prompt for a script involving a lesson about friendship."
output: {
    title: "Friendship Adventures",
    objectif: "Produce a script for a children's show episode that illustrates the value of friendship through a captivating narrative.",
    example: "input: Lesson - Friendship\noutput: Title - 'The Friendship Quest', Script Outline - 'The main characters, Kiko and Momo, embark on a quest to find the Secret Garden. Along the way, they meet new friends and overcome challenges by working together, learning valuable lessons about trust, sharing, and support.'",
    instruction: "Formulate a prompt that elicits detailed scenarios, dialogues, and character interactions focused on a core moral lesson, aiming to engage and educate young viewers."
  }`,
    instruction:
      "Design a prompt that guides the user to write a script for a kids’ show. The prompt should emphasize storytelling, character development, and a moral lesson, suitable for engaging a young audience and teaching them valuable life lessons.",
  },

  {
    title: "Bluey’s Friendship Lesson",
    objectif:
      'Create a script for an episode of "Bluey" that teaches children about the values of friendship.',
    example: `input: "Develop a "Bluey" script that revolves around a friendship lesson."
output: {
    title: "Bluey and the Lost Toy",
    objectif: "Craft an episode script where Bluey learns about empathy and sharing through a story about a lost toy.",
    example: "input: Lesson - Empathy and Sharing
    output: Title - 'Bluey’s Quest for Bingo’s Toy', Script Outline - 'In this episode, Bluey discovers that her sister Bingo has lost her favorite toy. Despite wanting to play with her own toys, Bluey decides to help Bingo in her search. Throughout the adventure, they encounter friends who offer to help, showing the importance of empathy and sharing. By the end, Bluey has learned a valuable lesson about putting friends' needs before her own wants.'",
    instruction: "Use this prompt to generate an engaging narrative that fits the "Bluey" show's style and ethos, complete with character dialogue and scene descriptions. The script should include situations that are relatable to young children and demonstrate the episode’s moral lesson about friendship."
  }`,
    instruction:
      'Utilize this prompt to write a full script for a "Bluey" episode. The story should involve Bluey learning a lesson about friendship in a way that resonates with preschool-aged children, incorporating playful scenarios and interactions with other characters.',
  },
  {
    title: "Word Counter",
    objectif: "Count the number of words in a text.",
    example: 'input: "Hello world!"\noutput: 2',
    instruction:
      "Calculate and return the number of words in the provided text.",
  },
  {
    title: "Markdown Concept Explainer",
    objectif:
      "Explain a specified concept using markdown formatting for clear and structured documentation.",
    example:
      "input: Explain the concept of 'Polymorphism' in Object-Oriented Programming output: '## Polymorphism in Object-Oriented Programming Polymorphism is a fundamental concept in object-oriented programming (OOP) that allows objects of different types to be treated as objects of a common superclass. It is the ability of a variable, function, or object to take on multiple forms. ### Examples of Polymorphism - **Method Overloading**: The ability to define several methods all with the same name but different signatures (different parameter lists). - **Method Overriding**: A child class providing a specific implementation of a method that is already provided by one of its parent classes. ### Benefits - **Flexibility**: Allows for writing more generic and reusable code. - **Maintainability**: Makes it easier to extend the existing code with new features without changing the existing functionality.'",
    instruction:
      "Create a prompt that takes a programming or technical concept as input and returns an explanation in markdown format. The markdown should include headers, subheaders, bullet points, and bold or italicized text where appropriate for clarity and emphasis.",
  },

  {
    title: "HTML Enhancer with Tailwind CSS",
    objectif:
      "Transform raw HTML into a beautifully formatted HTML with Tailwind CSS classes.",
    example:
      'input: <button class="btn">Submit</button> output: <button class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>',
    instruction:
      "Generate a prompt that will take raw HTML code as input and return the HTML code enhanced with appropriate Tailwind CSS classes to style the components effectively.",
  },
  {
    title: "Character Reverser",
    objectif: "Reverse the characters in a string.",
    example: 'input: "abcdefg"\noutput: "gfedcba"',
    instruction:
      "Take the input string and reverse the order of its characters.",
  },
  {
    title: "Substring Extractor",
    objectif: "Extract a substring from a given string.",
    example: 'input: "Hello world", start: 0, length: 5\noutput: "Hello"',
    instruction:
      "Extract a substring from the input text starting at the given index with the specified length.",
  },
  {
    title: "Palindrom Checker",
    objectif: "Check if a text is a palindrome.",
    example: 'input: "madam"\noutput: true',
    instruction:
      "Determine whether the input text is a palindrome (reads the same backward as forward).",
  },
  {
    title: "Hash Generator",
    objectif: "Generate a hash from a string.",
    example: 'input: "password123"\noutput: "e6c06e3a3978bef674572b3b8f01798f"',
    instruction:
      "Create a hash from the input string using a specified hashing algorithm.",
  },
];
