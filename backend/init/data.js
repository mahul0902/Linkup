export const sampleComments = [
  // Replies to Post 1 (Aarav - React App Deployment)
  { author: "Kunal", content: "Congrats Aarav! What did you use for the backend?", created_at: new Date("2026-03-24T10:30:00Z") },
  { author: "Sneha", content: "Deployment is always the hardest part, great job pushing through!", created_at: new Date("2026-03-24T09:15:00Z") },
  
  // Replies to Post 2 (Priya - Quantitative Aptitude)
  { author: "Aman", content: "Check out IndiaBix, it was a lifesaver for my placements.", created_at: new Date("2026-03-23T18:45:00Z") },
  { author: "Pooja", content: "RS Aggarwal is the gold standard if you want a physical book!", created_at: new Date("2026-03-23T16:20:00Z") },
  
  // Replies to Post 3 (Kabir - Coffee and Coding)
  { author: "Karan", content: "I run entirely on caffeine at this point 😂", created_at: new Date("2026-03-22T12:05:00Z") },
  { author: "Neha", content: "Nothing beats a fresh brew and a blank code editor.", created_at: new Date("2026-03-22T20:10:00Z") },
  
  // Replies to Post 4 (Neha - React State)
  { author: "Raj", content: "Wait until you discover Redux! But seriously, useState is a game changer.", created_at: new Date("2026-03-21T14:55:00Z") },
  { author: "Simran", content: "I struggled with it too, but the 'aha' moment is the best feeling.", created_at: new Date("2026-03-21T08:30:00Z") },
  
  // Replies to Post 5 (Rohan - Debugging Break)
  { author: "Amit", content: "Sometimes stepping away is the best debugging tool. Enjoy the view!", created_at: new Date("2026-03-20T22:40:00Z") },
  { author: "Priya", content: "Much needed! The bugs will still be there when you get back 😅", created_at: new Date("2026-03-20T19:15:00Z") },
  
  // Replies to Post 6 (Ananya - npm install errors)
  { author: "Akash", content: "Every single time! The sea of red text is terrifying.", created_at: new Date("2026-03-19T11:00:00Z") },
  { author: "Shruti", content: "Just delete node_modules and try again, works 90% of the time!", created_at: new Date("2026-03-19T17:50:00Z") },
  
  // Replies to Post 7 (Vikram - Indian Knowledge System)
  { author: "Gaurav", content: "It's amazing how concepts in Vedanta map to quantum mechanics.", created_at: new Date("2026-03-18T13:25:00Z") },
  { author: "Nisha", content: "Do you have any book recommendations on this? Sounds fascinating.", created_at: new Date("2026-03-18T09:10:00Z") },
  
  // Replies to Post 8 (Meera - Time and Work Problems)
  { author: "Yash", content: "Try the LCM method instead of fractions, it makes it so much faster!", created_at: new Date("2026-03-17T21:35:00Z") },
  { author: "Tanya", content: "Same here. If A and B build a wall, I just want to sit and watch them.", created_at: new Date("2026-03-17T16:45:00Z") },
  
  // Replies to Post 9 (Aditya - Dual Monitors)
  { author: "Manish", content: "I can't even imagine going back to a single screen now.", created_at: new Date("2026-03-16T10:20:00Z") },
  { author: "Kavita", content: "Code on one screen, StackOverflow on the other. This is the way.", created_at: new Date("2026-03-16T14:30:00Z") },
  
  // Replies to Post 10 (Sanya - Seating Arrangement)
  { author: "Saurabh", content: "Those circular ones where some face inside and some face outside are the worst!", created_at: new Date("2026-03-15T08:15:00Z") },
  { author: "Anjali", content: "Great job! Practicing these really sharpens your logical reasoning.", created_at: new Date("2026-03-15T23:50:00Z") },
  
  // Replies to Post 11 (Arjun - Machine Learning & Tensors)
  { author: "Deepak", content: "Linear algebra is the real boss battle of Machine Learning.", created_at: new Date("2026-03-14T19:05:00Z") },
  { author: "Kirti", content: "Check out 3Blue1Brown on YouTube, his series makes the math so visual and easy!", created_at: new Date("2026-03-14T12:40:00Z") },
  
  // Replies to Post 12 (Kiara - AI Chatbot Hackathon)
  { author: "Vikas", content: "Good luck Kiara! Are you using the OpenAI API or training a custom model?", created_at: new Date("2026-03-13T15:25:00Z") },
  { author: "Swati", content: "Remember to sleep at least a few hours! Rooting for your team.", created_at: new Date("2026-03-13T09:10:00Z") },
  
  // Replies to Post 13 (Rahul - Git Merge Conflicts)
  { author: "Prateek", content: "I won't change your mind because you are 100% correct.", created_at: new Date("2026-03-13T20:55:00Z") },
  { author: "Ritu", content: "VS Code's merge editor makes it a *little* less painful, but it still hurts.", created_at: new Date("2026-03-13T14:20:00Z") },
  
  // Replies to Post 14 (Ishita - Mock Interviews)
  { author: "Tarun", content: "Mock interviews are meant to expose those gaps. Better now than in the real thing!", created_at: new Date("2026-03-13T08:45:00Z") },
  { author: "Jyoti", content: "Focus on OOPs concepts and OS, they always ask about those.", created_at: new Date("2026-03-13T17:30:00Z") },
  
  // Replies to Post 15 (Dev - Software Project Management)
  { author: "Rohan", content: "Agile and Scrum feel like a lot of overhead until you work on a disorganized team!", created_at: new Date("2026-03-13T11:15:00Z") },
  { author: "Megha", content: "Good documentation saves hours of coding. Lesson learned the hard way.", created_at: new Date("2026-03-13T07:00:00Z") }
];

export const samplePosts = [
  {
    author: "Aarav",
    content: "Just deployed my first full-stack React app! The backend was tricky but we got there. 🚀",
    image: "https://picsum.photos/id/0/800/600",
    likes: 42,
    created_at: new Date("2026-03-12T10:30:00Z"),
    comments: ['69c4134944fc15e6f399079c', '69c4134944fc15e6f399079d']
  },
  {
    author: "Priya",
    content: "Can anyone recommend good resources for practicing quantitative aptitude? Placements are coming up fast...",
    image: "https://picsum.photos/id/4/800/600",
    likes: 15,
    created_at: new Date("2026-03-11T08:15:00Z"),
    comments: ['69c4134944fc15e6f399079e', '69c4134944fc15e6f399079f']
  },
  {
    author: "Kabir",
    content: "Coffee and coding. The ultimate duo. ☕💻",
    image: "https://picsum.photos/id/119/800/600",
    likes: 88,
    created_at: new Date("2026-03-10T18:45:00Z"),
    comments: ['69c4134944fc15e6f39907a0', '69c4134944fc15e6f39907a1']
  },
  {
    author: "Neha",
    content: "Finally wrapped my head around React state. It makes so much sense once it clicks!",
    image: "https://picsum.photos/id/180/800/600",
    likes: 34,
    created_at: new Date("2026-03-09T14:20:00Z"),
    comments: ['69c4134944fc15e6f39907a2', '69c4134944fc15e6f39907a3']
  },
  {
    author: "Rohan",
    content: "Taking a much-needed break from debugging to enjoy the sunset.",
    image: "https://picsum.photos/id/111/800/600",
    likes: 112,
    created_at: new Date("2026-03-08T19:05:00Z"),
    comments: ['69c4134944fc15e6f39907a4', '69c4134944fc15e6f39907a5']
  },
  {
    author: "Ananya",
    content: "Does anyone else get a mini heart attack when npm install throws a bunch of errors?",
    image: "https://picsum.photos/id/20/800/600",
    likes: 67,
    created_at: new Date("2026-03-08T11:10:00Z"),
    comments: ['69c4134944fc15e6f39907a6', '69c4134944fc15e6f39907a7']
  },
  {
    author: "Vikram",
    content: "Reading up on the Indian Knowledge System and its parallels with modern science. Fascinating stuff! 🧘‍♂️",
    image: "https://picsum.photos/id/367/800/600",
    likes: 29,
    created_at: new Date("2026-03-07T16:55:00Z"),
    comments: ['69c4134944fc15e6f39907a8', '69c4134944fc15e6f39907a9']
  },
  {
    author: "Meera",
    content: "Who else is struggling with time and work problems? It feels like hitting a brick wall.",
    image: "https://picsum.photos/id/2/800/600",
    likes: 55,
    created_at: new Date("2026-03-06T09:30:00Z"),
    comments: ['69c4134944fc15e6f39907aa', '69c4134944fc15e6f39907ab']
  },
  {
    author: "Aditya",
    content: "Setup my new workspace today. Dual monitors are a game changer for web dev.",
    image: "https://picsum.photos/id/60/800/600",
    likes: 140,
    created_at: new Date("2026-03-05T20:40:00Z"),
    comments: ['69c4134944fc15e6f39907ac', '69c4134944fc15e6f39907ad']
  },
  {
    author: "Sanya",
    content: "Just solved the seating arrangement puzzle that took me 2 hours yesterday. Persistence pays off!",
    image: "https://picsum.photos/id/9/800/600",
    likes: 41,
    created_at: new Date("2026-03-04T13:15:00Z"),
    comments: ['69c4134944fc15e6f39907ae', '69c4134944fc15e6f39907af']
  },
  {
    author: "Arjun",
    content: "Machine Learning is amazing, but tensor math is no joke. Back to the textbooks...",
    image: "https://picsum.photos/id/250/800/600",
    likes: 22,
    created_at: new Date("2026-03-04T17:00:00Z"),
    comments: ['69c4134944fc15e6f39907b0', '69c4134944fc15e6f39907b1']
  },
  {
    author: "Kiara",
    content: "Weekend hackathon time! We are building an AI chatbot. Wish us luck! 🤖",
    image: "https://picsum.photos/id/48/800/600",
    likes: 95,
    created_at: new Date("2026-03-03T10:50:00Z"),
    comments: ['69c4134944fc15e6f39907b2', '69c4134944fc15e6f39907b3']
  },
  {
    author: "Rahul",
    content: "Git merge conflicts are the absolute worst. Change my mind.",
    image: "https://picsum.photos/id/201/800/600",
    likes: 76,
    created_at: new Date("2026-03-02T15:25:00Z"),
    comments: ['69c4134944fc15e6f39907b4', '69c4134944fc15e6f39907b5']
  },
  {
    author: "Ishita",
    content: "Just finished a mock interview. I really need to brush up on my core fundamentals.",
    image: "https://picsum.photos/id/1/800/600",
    likes: 38,
    created_at: new Date("2026-03-01T09:10:00Z"),
    comments: ['69c4134944fc15e6f39907b6', '69c4134944fc15e6f39907b7']
  },
  {
    author: "Dev",
    content: "Studying software project management. It's crazy how much goes into planning before writing a single line of code.",
    image: "https://picsum.photos/id/175/800/600",
    likes: 50,
    created_at: new Date("2026-03-01T18:35:00Z"),
    comments: ['69c4134944fc15e6f39907b8', '69c4134944fc15e6f39907b9']
  }
];