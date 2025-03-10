export default {
    blogs: [
        {
            id: "veritas-reliability-scoring",
            tags: [
                {tag: "Next.js"},
                {tag: "Algorithms"},
                {tag: "Data Analysis"},
            ],
            title: "Veritas Search Engine: The Dark Art of Reliability Scoring",
            date: "03/02/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt:
                "A deep dive into the algorithm behind Veritas Search Engine's reliability scoring system, and the challenges of determining trustworthiness on the web.",
            content: [
                "Veritas Search Engine aims to provide users with not just search results, but *reliable* search results. This meant developing a system to score the trustworthiness of each source, a task that quickly revealed itself to be more art than science.",

                "The initial approach was simplistic: give points for .edu and .gov domains, subtract points for known clickbait sites. This quickly proved inadequate. A well-written blog post on a personal site could be far more accurate than a poorly researched article on a 'reputable' news site.",

                "The solution was to build a multi-faceted scoring system. This included factors like: content quality (analyzing sentence structure and word choice), domain reputation (based on age, backlinks, and historical data), publication history (whether the site is known for factual reporting), and even recency (prioritizing up-to-date information).",

                "Even with these factors, the system wasn't perfect. Determining content quality algorithmically is incredibly difficult. Sarcasm, nuance, and subtle biases are hard to detect. To combat this, we implemented a system for manual review, allowing human editors to flag sites that consistently provide misleading information.",

                "The reliability scoring system is constantly evolving. We're always tweaking the algorithm, adding new factors, and refining the manual review process. The goal is to provide users with the most trustworthy search results possible, even in the face of misinformation and bias.",

                "One of the most surprising discoveries was the impact of design on perceived reliability. A site with a clean, professional design was often perceived as more trustworthy, even if the content was no better than a site with a cluttered, outdated design. This highlights the importance of visual cues in shaping user perceptions.",

            ],
            image: "/assets/images/blog/veritas-reliability.png",
        },

        {

            id: "parallax-website-authentication",
            tags: [
                {tag: "Next.js"},
                {tag: "Firebase"},
                {tag: "Authentication"},
                {tag: "Web Development"},
            ],
            title: "Securing Parallax Interactive: Building a Firebase-Powered Authentication System",
            date: "03/02/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt: "A deep dive into the process of implementing a secure authentication system for the Parallax Interactive website using Firebase, and the challenges we overcame.",
            content: [
                "One of the core requirements for the Parallax Interactive website was a secure, yet simple, authentication system for the dev team. We opted for Firebase Authentication due to its ease of integration and robust security features.",
                "Initially, we planned to use a more complex setup with tRPC, NextAuth, and Prisma. However, to keep the project lightweight and focused, we decided to implement a custom authentication solution using Firebase directly.",
                "The first challenge was creating a protected route component that would redirect unauthenticated users to the login page. We used React Context to manage the authentication state and a custom hook to check if the user was logged in.",
                "Another challenge was handling the asynchronous nature of Firebase Authentication. We needed to ensure that the UI didn't render before the authentication state was fully loaded. We used a loading state to display a spinner while the authentication state was being resolved.",
                "Finally, we implemented a manual user management system, where new users are added directly to Firebase Authentication with pre-defined credentials. This allowed us to avoid the complexity of user registration and focus on providing a secure and streamlined experience for the dev team.",
                "By carefully designing the authentication system and handling the asynchronous nature of Firebase, we were able to create a secure and user-friendly experience for the Parallax Interactive dev team.",
                "For future improvements, we could explore adding more advanced features such as multi-factor authentication or integrating with a password manager. However, for the current needs of the project, the Firebase-powered authentication system provides a solid foundation.",

            ],
            image: "/assets/images/blog/firebase-auth.png",
        },
        {
            id: "veritas-serp-api-taming",
            tags: [
                {tag: "Next.js"},
                {tag: "API Integration"},
                {tag: "Backend Development"},
            ],
            title: "The Veritas Search Engine: Taming the SERP API Beast",
            date: "03/01/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt:
                "The challenges and solutions in integrating with the SERP API for Veritas Search Engine, ensuring reliable and accurate search results.",
            content: [
                "Building Veritas Search Engine meant relying heavily on the SERP API to fetch search results. Initially, the integration seemed straightforward: send a query, receive results, display them. However, the reality was far more complex.",

                "One of the first major hurdles was handling the inconsistent data structure returned by the SERP API. Different search queries would return results with varying fields and formats. This made it difficult to create a consistent and reliable parsing mechanism.",

                "The solution was to implement a robust data validation and transformation layer. This layer would normalize the data from the SERP API into a consistent format, regardless of the query. This involved defining TypeScript types for the expected data structure and using validation libraries to ensure that the data conformed to these types.",

                "Another challenge was handling API rate limits. The SERP API has strict rate limits, and exceeding these limits would result in errors. To address this, I implemented a rate-limiting mechanism that would queue requests and send them at a controlled rate.",

                "Finally, error handling was crucial. The SERP API could return errors for various reasons, such as invalid queries or temporary outages. To provide a good user experience, I implemented comprehensive error handling that would gracefully handle these errors and display informative messages to the user.",

                "Through careful planning, robust data validation, and comprehensive error handling, we successfully tamed the SERP API beast and built a reliable foundation for Veritas Search Engine.",

                "A particularly tricky issue was handling pagination with the SERP API. The API doesn't provide a traditional pagination mechanism. Instead, it requires sending a new request with an offset parameter. This made it difficult to implement a seamless 'load more' feature. The solution involved carefully managing the offset parameter and ensuring that the user didn't accidentally request the same results multiple times.",

            ],
            image: "/assets/images/blog/veritas-serp-api.png",
        },
        {
            id: "parallax-website-roadmap",
            tags: [
                {tag: "Next.js"},
                {tag: "Firebase"},
                {tag: "Roadmap"},
                {tag: "Web Development"},
            ],
            title: "Charting the Course: Implementing an Interactive Roadmap with Firebase and Next.js",
            date: "03/01/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt: "A behind-the-scenes look at how we built an interactive roadmap for the Parallax Interactive website using Firebase and Next.js, and the challenges we faced along the way.",
            content: [
                "One of the key features of the Parallax Interactive website was an interactive roadmap that would allow visitors to track the studio's progress on various projects.",
                "We decided to use Firebase Firestore to store the roadmap data, as it provides a real-time database that is easy to integrate with Next.js.",
                "The first challenge was designing a data structure that would allow us to easily display the roadmap milestones in a chronological order. We used a `date` field with a Firebase Timestamp to ensure that the milestones were always sorted correctly.",
                "Another challenge was implementing the interactive timeline UI. We used Tailwind CSS to create a visually appealing and responsive timeline that would work well on both desktop and mobile devices.",
                "Finally, we implemented a system for the dev team to manage the roadmap milestones through a private dashboard. This allowed them to easily add, edit, and delete milestones, and to control their visibility on the public roadmap.",
                "By combining Firebase Firestore with Next.js and Tailwind CSS, we were able to create an interactive and informative roadmap that provides valuable insights into the studio's progress.",
                "For future improvements, we could explore adding more advanced features such as filtering milestones by project or allowing users to subscribe to updates. However, for the current needs of the project, the Firebase-powered roadmap provides a solid foundation.",

            ],
            image: "/assets/images/blog/roadmap.png",
        },
        {
            id: "veritas-ai-summary-quest",
            tags: [
                {tag: "Next.js"},
                {tag: "AI"},
            ],
            title: "Veritas Search Engine: The Quest for Reliable AI Summaries",
            date: "02/28/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt:
                "The challenges and triumphs in generating accurate and helpful AI summaries for Veritas Search Engine using the OpenAI API.",
            content: [
                "A key feature of Veritas Search Engine is the AI-powered summary that provides a concise overview of the search results. However, generating reliable and helpful summaries proved to be a significant challenge.",

                "The initial approach involved simply feeding the top search results to the OpenAI API and asking it to generate a summary. This often resulted in summaries that were inaccurate, irrelevant, or simply regurgitated the content of the search results.",

                "The solution was to refine the prompt that was sent to the OpenAI API. This involved providing more specific instructions on the desired characteristics of the summary, such as accuracy, conciseness, and relevance. I also experimented with different models and parameters to find the optimal configuration.",

                "Another challenge was handling the cost of the OpenAI API. Generating summaries for every search query could quickly become expensive. To address this, I implemented a caching mechanism that would store previously generated summaries and reuse them for subsequent queries.",

                "Finally, I added a feedback mechanism that allows users to rate the quality of the AI summaries. This feedback is used to continuously improve the prompt and the overall quality of the summaries.",

                "Through careful prompt engineering, caching, and user feedback, we were able to create AI summaries that are both reliable and helpful, enhancing the user experience of Veritas Search Engine.",
                "One of the most interesting challenges was dealing with contradictory information in the search results. The AI summary would sometimes present conflicting viewpoints without acknowledging the disagreement. To address this, I added instructions to the prompt that explicitly asked the AI to identify and acknowledge any conflicting information.",

            ],
            image: "/assets/images/blog/veritas-ai-summary.png",
        },
        {
            id: "parallax-website-spreadsheets",
            tags: [
                {tag: "Next.js"},
                {tag: "Embedding"},
                {tag: "Web Development"},
            ],
            title: "Data-Driven Development: Embedding Google Sheets for Project Management",
            date: "02/27/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt: "A look at how we integrated Google Sheets into the Parallax Interactive website for project management, and the challenges of embedding external content.",
            content: [
                "To streamline project management, we needed a way to embed and interact with Excel spreadsheets directly within the Parallax Interactive website.",
                "Initially, we explored uploading and displaying spreadsheet files directly. However, this proved to be complex and required significant server-side processing.",
                "We then decided to use Google Sheets and embed them using iframes. This allowed us to leverage Google's powerful spreadsheet editor and collaboration features.",
                "The first challenge was dealing with Content Security Policy (CSP) restrictions. Google's CSP prevented us from embedding the sheets directly, so we had to find a workaround.",
                "We ultimately decided to link to the Google Sheets instead of embedding them. This avoided the CSP issue entirely and allowed users to open the sheets in a new tab for editing.",
                "By linking to Google Sheets, we were able to provide a seamless and user-friendly experience for the dev team, while also avoiding the complexities of handling spreadsheet files directly.",
                "For future improvements, we could explore using the Google Sheets API to fetch and display the data in a more customized format. However, for the current needs of the project, linking to the Google Sheets provides a simple and effective solution.",

            ],
            image: "/assets/images/blog/google-sheets.png",
        },
        {
            id: "chronosboard-journey",
            tags: [
                {tag: "React"},
                {tag: "TypeScript"},
                {tag: "Web Development"},
            ],
            title: "Building ChronosBoard: The Journey from Concept to Reality",
            date: "02/10/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt: "The development process behind ChronosBoard, the obstacles faced, and the solutions that turned challenges into stepping stones.",
            content: [
                "ChronosBoard started as an ambitious idea—bringing together a note-taking app, Kanban board, to-do list, and productivity tracker into one seamless experience. It sounded great in theory, but turning it into reality was an entirely different challenge.",

                "One of the first major issues was structuring the Kanban board. Initially, dragging tasks between columns worked inconsistently, and saving column order was unreliable. The problem? State management. I had to rethink the entire approach, ensuring Firestore updates synced properly while keeping UI reactivity smooth. After multiple iterations, I refined the logic and got the drag-and-drop functionality working seamlessly.",

                "Another major improvement was adding a global theme customizer. Initially, the app loaded in a default color scheme with no persistence. On restarting, everything reset. That led to implementing localStorage to remember the selected theme and dark mode settings across sessions, ensuring users never had to manually reset their preferences.",

                "One of the most frustrating bugs came with the time-tracking feature. It recorded time inconsistently, sometimes resetting or failing to save entries properly. Fixing this required restructuring how the timer stored data, ensuring that start/stop times were accurately written to Firestore while allowing seamless task switching.",

                "Through every issue, every broken feature, and every unexpected bug, the process of solving problems, tweaking features, and refining the UI became an integral part of making ChronosBoard what it is today—a fully functional productivity tool that works exactly as envisioned. It’s been an incredible journey of trial, error, and success.",

                "Authentication was another hurdle. Firebase authentication seemed straightforward, but ensuring each user had isolated tasks, boards, and notes took a lot of backend structuring. Linking everything correctly—especially across multiple users collaborating—wasn’t as simple as adding an 'owner' field. Permissions, security rules, and Firestore queries all had to be tweaked repeatedly until everything finally worked as expected",

            ],
            image: "/assets/images/portfolio/ChronosBoard.png"
        },
        {
            id: "coding-journey",
            tags: [
                {tag: "Learning"},
            ],
            title: "How I Started Coding: A Journey Through Learning and Exploration",
            date: "02/04/2025",
            author: "Alexander Castro - The Pantheon Dev",
            excerpt: "From Mimo.org and Sololearn to Udemy, my journey into coding has been a mix of structured learning, hands-on practice, and constant growth.",
            content: [
                "My journey into coding didn’t start with a formal class or a mentor—it started with curiosity. I wanted to understand how software worked, how websites were built, and how to create my own applications from scratch. So, I jumped into online platforms like Mimo.org, Sololearn, and Udemy, eager to absorb as much knowledge as possible.",

                "JavaScript was the first real challenge. It wasn’t just about writing code but understanding how logic flowed, how functions interacted, and why certain patterns worked better than others. Once I got comfortable, I moved on to TypeScript, which added another layer of structure and made my projects more maintainable.",

                "From there, I dove into React, learning how to build reusable components and manage state effectively. SQL, Node, and Express followed, expanding my understanding of databases and backend development. Swift introduced me to mobile app development, while Python helped me appreciate scripting and automation.",

                "Each language and framework brought new challenges—SQL queries that wouldn’t return the expected data, React state not updating properly, backend endpoints not responding as expected. But with every bug and every fix, I learned more than just syntax. I learned problem-solving, debugging strategies, and how to approach coding logically.",

                "What started as an interest in building basic projects quickly evolved into larger, structured applications. Combining everything I learned, I began creating full-stack applications, integrating authentication, database management, and UI/UX design. Looking back, the structured courses helped lay the foundation, but hands-on practice and real-world problem-solving turned those concepts into actual skills.",

                "Now, coding isn’t just something I study—it’s something I do daily, refining, improving, and pushing my projects forward."
            ],
            image: "/assets/images/blog/CodingJourney.png"
        }

    ],

    notFound: {
        id: "not-found",
        title: "Post Not Found",
        date: "01/01/2020",
        author: "Goblins",
        content: [
            "We do not know how you made it here, but you got here! So welcome and I hope you find a way out!"
        ],
        image: "https://static.canva.com/web/images/e01d35db7c198554ae022ee3216ee495.jpg"
    }


}