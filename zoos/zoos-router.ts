import { Router, Response, Request } from 'express';
import Knex = require("knex");

const zooRouter = Router();
const knexConfig: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3',
    },
    // debug: true,
};

const db: Knex = Knex( knexConfig );

interface zoo {
    id: number,
    name: string,
}

zooRouter.get( '/', ( req: Request, res: Response ) => {
    // returns a promise that resolves to all records in the table
    db( 'zoos' )
        .then( ( zoos: zoo[] ) => {
            res.status( 200 ).json( zoos );
        } )
        .catch( ( error: Error ) => {
            res.status( 500 ).json( error );
        } );
} );

zooRouter.get( '/:id', ( req: Request, res: Response ) => {
    const zooId = req.params.id;
    
    db( 'zoos' )
        .where( { id: zooId } )
        .first()
        .then( ( zoo: zoo ) => {
            res.status( 200 ).json( zoo );
        } )
        .catch( ( error: Error ) => {
            res.status( 500 ).json( error );
        } );
} );

zooRouter.post( '/', ( req: Request, res: Response ) => {
    
    db( 'zoos' )
        .insert( req.body )
        .then( ( ids: number[] ) => {
            const id = ids[ 0 ];
            db( 'zoos' )
                .where( { id } )
                .first()
                .then( ( zoo: zoo ) => {
                    res.status( 201 ).json( zoo );
                } );
        } )
        .catch( ( error: Error ) => {
            res.status( 500 ).json( error );
        } );
} );

zooRouter.put( '/:id', ( req: Request, res: Response ) => {
    db( 'zoos' )
        .where( { id: req.params.id } )
        .update( req.body )
        .then( ( count: number ) => {
            if ( count > 0 ) {
                res.status( 200 ).json( count );
            } else {
                res.status( 404 ).json( { message: 'Record not found' } );
            }
        } )
        .catch( ( error: Error ) => {
            res.status( 500 ).json( error );
        } );
} );

zooRouter.delete( '/:id', ( req: Request, res: Response ) => {
    db( 'zoos' )
        .where( { id: req.params.id } )
        .del()
        .then( ( count: number ) => {
            if ( count > 0 ) {
                res.status( 204 ).end();
            } else {
                res.status( 404 ).json( { message: 'Record not found' } );
            }
        } )
        .catch( ( error: Error ) => {
            res.status( 500 ).json( error );
        } );
} );

module.exports = zooRouter;
