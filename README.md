# Digital-Store
Digital-Store is a versatile e-commerce platform that specializes in providing a wide range of digital products. The platform is designed to cater to various sectors, including management, healthcare, marketing, finance, multimedia, and education.

Our products range from reservation management systems, online ordering and delivery platforms, inventory management systems, to e-learning platforms and more. Each product is designed with the latest technologies and is tailored to meet the specific needs of the industry it serves.

[Visit Digital Store Backend](https://digital-store-backend.netlify.app/)


## Key Features
Diverse Product Range: We offer a wide variety of digital products, each designed to cater to specific industry needs. Whether you need a reservation management system for your restaurant or an e-learning platform for your educational institution, we've got you covered.

Quality Assurance: Each product on our platform is thoroughly tested and rated by users to ensure you get the best quality.

User-Friendly Interface: Our platform is designed to provide a seamless and user-friendly experience for both buyers and sellers.

Tech Stack: Our products are built using a variety of modern web technologies, including React, Node.js, Django, Python, Angular, PHP, Laravel, Java, Spring Boot, Swift, Kotlin, JavaScript, Express.js, Ruby on Rails, Unity, and C#.

Product Management: Allows sellers to easily add, update, and manage their digital products.

Category Management: Organizes products into various categories for easy navigation and search.

Shopping Cart: Enables buyers to add products to a shopping cart and proceed to checkout when ready.

Order Management: Handles order processing, including payment and delivery of digital products.

Search and Filter: Allows buyers to search for specific products and filter results based on various criteria.

User Management: Manages user accounts, including registration, login, and profile management.

Digital-Store is your one-stop-shop for all your digital product needs. Whether you're a buyer looking for a specific digital product or a seller looking to reach a wider audience, Digital-Store is the platform for you.

---

This is a Node.js and Express server for a digital store. The server provides API endpoints for managing products and shopping carts.

## Features

- CRUD operations for products
- Create and update operations for shopping carts
- Data persistence using JSON files

## Upcoming Features

- User management: We are currently developing features for user registration, authentication, and profile management. Stay tuned for updates!

## API Endpoints

### Products

- `GET /api/products/`: List all products
- `GET /api/products/:pid`: Get a specific product by ID
- `POST /api/products/`: Add a new product
- `PUT /api/products/:pid`: Update a specific product by ID
- `DELETE /api/products/:pid`: Delete a specific product by ID

### Shopping Carts

- `POST /api/carts/`: Create a new shopping cart
- `GET /api/carts/:cid`: Get a specific shopping cart by ID
- `POST /api/carts/:cid/products/:pid`: Add a product to a specific shopping cart

## Setup and Running

1. Clone the repository: `git clone https://github.com/yourusername/digital-store.git`
2. Navigate into the project directory: `cd digital-store`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## API Usage

To interact with the Digital-Store backend API, you can use the provided Postman collection. The collection includes a set of requests that you can use to test the API endpoints.

### Postman Collection

You can import the Postman collections JSON files:
- PrimeraEntrega-Carts.postman_collection.json
- PrimeraEntrega-Products.postman_collection.json

Import them into your Postman application. The collection contains the following requests:

- List all products: `GET /api/products/`
- Get a specific product by ID: `GET /api/products/:pid`
- Add a new product: `POST /api/products/`
- Update a specific product by ID: `PUT /api/products/:pid`
- Delete a specific product by ID: `DELETE /api/products/:pid`

- Create a new shopping cart: `POST /api/carts/`
- Get a specific shopping cart by ID: `GET /api/carts/:cid`
- Add a product to a specific shopping cart: `POST /api/carts/:cid/products/:pid`

Please note that you need to have the Digital-Store backend server running locally or deployed in order to use these requests.

### Testing the API

1. Import the Postman collection JSON file into your Postman application.
2. Start the Digital-Store backend server according to the setup instructions in the README.
3. Send requests to the API endpoints using the imported collection.

Feel free to explore and test the different API endpoints using the provided requests.


## Contributing

Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
