# Angular User Management Dashboard

## Objective

The Angular User Management Dashboard is a web application that allows users to manage user profiles efficiently. It provides features for viewing, adding, editing, and deleting user profiles, seamlessly integrated with a dummy API. This project demonstrates the effective use of TypeScript for type-safe development and the handling of HTTP requests.

## Features

### User List Page

- Display a list of users, showcasing their:
  - Name
  - Email
  - Role

- Each user entry offers convenient options to:
  - Edit user information
  - Delete user profiles

- A user-friendly button is provided to add new users.

- If the API returns numerous users, pagination functionality is implemented for ease of navigation.

### Add/Edit User Form

- The application ensures proper form validation to maintain data integrity.

### API Integration

- The User Management Dashboard integrates with a dummy API for data management. You can choose from the following options:
  - [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
  - [Fake Store API](https://fakestoreapi.com/docs)

- HTTP calls are implemented for the following actions:
  - Fetching user profiles
  - Adding new users
  - Updating existing user information
  - Deleting user profiles

### Error Handling

- User-friendly error messages are displayed in case an API call fails, ensuring a seamless user experience.

- A loading spinner or placeholder is implemented while fetching data to keep users informed of ongoing processes.

### TypeScript

- The project places a strong emphasis on TypeScript to provide type-safe development.

- Interfaces are defined to maintain strict typing for user data, functions, methods, and components.

## Getting Started

Follow these steps to get your User Management Dashboard up and running:

1. Clone this repository:
   ```shell
   git clone https://github.com/YourGitHubUsername/User-Admin-Portal.git



1. Navigate to the project directory:

 ```shell
cd User-Admin-Portal




2.Install the required dependencies:

 ```shell
npm install




3. Start the development server:

 ```shell
ng serve```
4. Access the application in your web browser:

 ```shell
Copy code
http://localhost:4200/```
5. Contributing
Contributions to this project are welcome! Feel free to open issues, suggest enhancements, or submit pull requests.

6. License
This project is licensed under the MIT License. See the LICENSE file for details.

7. Happy coding! 🚀

 ```go

Replace `"YourGitHubUsername"` with your actual GitHub username in the clone URL, and make sure to include the appropriate licensing information in the `LICENSE` file or choose a license that suits your project.
