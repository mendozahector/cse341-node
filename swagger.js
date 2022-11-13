const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
  info: {
    title: 'CSE 341 Web Backend Developmet II Course API',
    description: 'Developing a secure REST API that performs CRUD operations on a NoSQL database.<br><br>\
                  By: Hector Mendoza<br>\
                  [https://mendozahector.github.io/](https://mendozahector.github.io/)<br><br>\
                  Tech Stack:<br>\
                  [Node.js / Express](https://expressjs.com/en/starter/hello-world.html])<br>\
                  [MongoDB](https://www.mongodb.com/docs/drivers/node/current/quick-start/)<br>\
                  [SwaggerUI](https://www.npmjs.com/package/swagger-ui-express)',
    contact: { email:'hectormmendozar@outlook.com'},
    license: {
      name:"Apache 2.0",
      url:"http://www.apache.org/licenses/LICENSE-2.0.html"
    },
  },
  tags: [
    {
      name: 'main',
      description: 'Welcome message & information'
    },
    {
      name: 'contacts',
      description: 'Access to contacts in MongoDB'
    },
  ],
  servers:
  [
    {
        url: 'https://mendozahectorcse341.onrender.com',
        description: 'Render'
    },{
        url: 'http://localhost:3000/',
        description: 'Sandox'
    },
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);