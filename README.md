# Digital Store

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

## Testing

You can use a tool like Postman to manually test the API endpoints.

## Contributing

Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
