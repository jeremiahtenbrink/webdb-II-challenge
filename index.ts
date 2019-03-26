import express, { Express } from 'express';
import helmet from 'helmet';

const server: Express = express();
const zooRouter = require( './zoos/zoos-router' );
const bearsRouter = require( './zoos/bears-router' );


server.use( express.json() );
server.use( helmet() );

// endpoints here
server.use( '/zoos', zooRouter );
server.use( '/bears', bearsRouter );


server.use( '/', ( req, res ) => {
    res.status( 200 ).json( { message: "Yup it works" } )
} );
const port = 3200;
server.listen( port, function () {
    console.log(
        `\n=== Web API Listening on http://localhost:${ port } ===\n` );
} );
