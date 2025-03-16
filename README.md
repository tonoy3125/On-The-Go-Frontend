# Travel Tips & Destination Guides Application

# Description

OnTheGo is a user-friendly travel web application where people can share their travel stories, tips, and experiences. Users can create profiles, follow fellow travelers, and discover new destinations. The app makes it easy to explore places, find useful travel advice, and connect with a community of travel lovers. It also offers premium content for exclusive travel guides and insights. With a mix of social interaction and helpful information, OnTheGo helps users plan trips, make better travel choices, and create unforgettable memories.

## Features

1. **User Authentication Pages:**

- **Sign Up Page:**

  - Users can sign up and will automatically be assigned the "user" role by default. Initially, there will be an admin in the database, and this admin will have the ability to promote other users to the "admin" role when necessary. The system allows users to create new accounts with a simple and secure registration process. It also includes form validation to ensure that all required fields are correctly filled out. After the registration attempt, the system will display appropriate success or error messages based on whether the process was completed successfully or if any issues occurred.

- **Login Page:**

  - Users can log in by entering their email and password, and the system will use token-based authentication to verify their identity. If there are any issues with the login process, such as incorrect credentials or other errors, the system will provide clear and helpful error messages to guide the user in resolving the issue. This ensures a smooth and secure login experience.

2. **User Profile Management:**

   - OnTheGo allows users to update their profiles, including adding a profile picture. The "My Profile" section displays posts, followers, and following, similar to Facebook or X. Users can see follower and following counts, making it easy to track connections.

   - Users can follow or unfollow others anytime. To encourage engagement, posts can receive upvotes. Once a user gets at least one upvote, they can apply for profile verification. Verification requires an online payment through AAMARPAY or Stripe. After payment, a verified badge appears next to their name.

   - Verified users get access to exclusive premium content with special travel tips and guides. This feature makes the platform more engaging and rewarding for active users.

   - With a simple and user-friendly interface, OnTheGo helps travelers connect, share experiences, and access valuable travel insights. The platform offers a smooth experience for managing profiles, building a follower base, and exploring premium content.

3. **Post Creation & Sharing:**

   - OnTheGo makes it easy for users to create and share travel tips, guides, and stories. Users can write detailed posts using a rich text editor or Markdown for better formatting. They can also attach images to make their posts more engaging and visually appealing.

   - To help users find content easily, posts can be categorized under topics like Adventure, Business Travel, Exploration, and more. This helps travelers browse specific interests and discover relevant posts.

   - The post creation interface is designed as a modal, ensuring a smooth and distraction-free experience. Users can also edit or delete their posts anytime.

   - Some posts can be marked as Premium, which means only verified users can access them. This feature adds value to exclusive travel content and encourages users to become verified.

4. **Upvote & Downvote System:**

   - OnTheGo allows users to upvote or downvote posts, making it easy to find the best travel content. Posts with more upvotes will appear higher, helping others discover useful tips, guides, and stories. To improve content visibility, the platform includes a sorting feature that displays posts with the highest upvotes at the top. This ensures that the most helpful and popular posts get noticed first. By voting on posts, users can support great content and help fellow travelers find the best advice and experiences. This interactive feature makes OnTheGo a more engaging and user-friendly platform for travel lovers.

5. **Commenting System:**

   - Users can leave comments on posts, making it easy to share thoughts and interact with others. They can also edit or delete their own comments anytime.If a post owner comments on their own post, they can delete their comment, but editing is optional. This gives users more control over their conversations. To encourage discussions, users can reply to other comments, making conversations more engaging and interactive. This feature helps travelers share ideas, ask questions, and connect with others in a meaningful way.With a simple and user-friendly interface, commenting is easy, keeping travel discussions fun and engaging

6. **Payment System:**

   - The platform integrates with Aamarpay, allowing users to easily make payments for access to premium content. This includes exclusive travel guides, destination tips, and verified user privileges. With this integration, users can securely pay to unlock valuable content that can enhance their travel planning. Once the payment is made, they can enjoy special features like access to expert tips, detailed travel guides, and the ability to become a verified user. The payment process is simple and safe, ensuring that users can make transactions without any hassle. After paying, users get instant access to the premium content, helping them make better travel decisions and plan unforgettable trips. By using Aamarpay, users have a smooth and reliable way to access exclusive features, enhancing their overall experience.

7. **News Feed:**

   - Users can enjoy a dynamic news feed that displays the latest travel posts from the community, keeping the content fresh and up-to-date. With infinite scrolling, more content loads automatically as users scroll down the page, offering a smooth and uninterrupted browsing experience. Users can also filter and search posts by category or user, making it easy to find specific content or explore posts from favorite users. Whether it's adventure travel, business trips, or destination guides, users can quickly narrow down the content.With infinite scrolling, filtering, and sorting options, users can easily discover and engage with the most relevant and popular travel content.Users can download PDF versions of travel guides or posts, allowing them to access the content offline anytime

8. **Following System:**

   - Users can follow other travelers, allowing them to stay updated on their latest posts, tips, and experiences. This helps build connections and keeps users engaged with the travel community

9. **Error Handling:**

- **User-Friendly Messages:**
  - All error scenarios, such as invalid form inputs, failed payment attempts, or out-of-stock items, are handled gracefully with descriptive error messages shown to the user.
- **Validation:**
  - Frontend form validations are in place for user details, product additions, and checkout processes, ensuring that required fields are completed before submission.

9. **Responsive Design:**

- **Mobile-Friendly:**
  - The entire frontend is designed to be fully responsive, ensuring an optimized experience on all devices, including desktops, tablets, and mobile phones.
- **Adaptive UI:**
  - Layouts adjust dynamically based on screen size, ensuring intuitive navigation and interaction regardless of the device being used.

## Technology Stack

- **Programming Language:** TypeScript
- **Framework & Library:** Next.js (with Hooks and Functional Components), Redux Toolkit (RTK)
- **UI Framework & Styling:** Tailwind CSS, raw CSS for specific hover effects,Shadcn ui
- **API Handling:** Axios, RTK Query for asynchronous API calls
- **Form Handling & Validation:** React Hook Form, Zod for validation schema
- **Routing:** Next.js App Router
- **Authentication:** JSON Web Tokens (JWT), with Redux for state persistence
- **Payment:** AAMARPAY
- **Persistence:** Redux Persist for saving authenticated user data
- **Image Handling:** Cloudinary (for image management)
- **Deployment:** Deployed on Vercel

## Installation and Setup

1. Clone the repository:

```
https://github.com/tonoy3125/On-The-Go-Frontend
```

2. Install dependencies:

```
cd On-The-Go-Frontend
npm install
```

4. Start the server:

```
npm run dev
```

5. Access the application in your browser at `http://localhost:3000 || http://localhost:3001`

## Usage

- Users can update their profile details, including uploading a profile picture. The "My Profile" section displays their posts, followers, and following count, with an interface similar to Facebook or X. Users can follow or unfollow others. Profile verification is available through AAMARPAY/Stripe after receiving at least one upvote on a post. Verified users receive a badge and access to premium content

- Users can create detailed travel guides, tips, and stories using a rich text editor or Markdown. They can attach images and categorize posts under topics like Adventure, Business Travel, and Exploration. Posts are created in a modal for a distraction-free experience. Users can edit or delete their posts and mark them as Premium, accessible only to verified users.

- Users can upvote or downvote posts to help surface the best content. Posts with the highest upvotes appear at the top of the list.

- Users can comment on posts, edit, or delete their own comments. If a post owner comments on their post, they can delete it. Users can also reply to comments to encourage discussions.

- Users can securely make payments via AAMARPAY or Stripe for premium content access, including exclusive travel guides and verification privileges.

- A dynamic news feed displays the latest travel posts with infinite scrolling. Users can filter and search posts by category or user and sort them based on upvote count to find the most helpful content.

- Users can follow other travelers to stay updated on their latest posts and travel experiences.
