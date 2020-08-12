module.exports = {

    database_local: 'mongodb://localhost/shopping-cart', // database connection string
    database_cloud: 'mongodb+srv://santhas:santhas123@cluster0.jxlbj.mongodb.net/react-shopping-cart?retryWrites=true&w=majority',
    database_live: '',
    secret: '$2a$10$hVGvofC92FZJuZV8wghfghffhCcIBLBxCDoTA.B4OSC', // Server secret key  need to change when deploying 
    port: 3000,
    issuer: 'www.tenent.com', // to verify token issuer with this value
    audience: 'mysite.com', // to verify token audience with this value
    searchLimit: 100, // Search limit config, Change this to set the search limit 
    deploy: true, // to toggle between dev mode and deoply mode : loggin with auth header when true
    product_categories: ['Mobile phones', 'Laptops', 'Accessories', 'Smart watches']
}