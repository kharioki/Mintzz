require('dotenv').config()

import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { MongoClient } from 'mongodb'
import { GraphQLScalarType } from 'graphql';

const typeDefs = gql`
  scalar Date

  type User {
    alias: String!
    address: String!
  }

  input UserInput {
    alias: String!
    address: String!
  }

  type NftItem {
    nftIndex: Int
    owner: String
    creator: String
    creatorAlias: String
    price: Float
    currentBid: Float
    createdAt: Date
    updatedAt: Date
  }

  input NftItemInput {
    nftIndex: Int
    owner: String
    creator: String
    creatorAlias: String
    price: Float
    currentBid: Float
    createdAt: Date
    updatedAt: Date
  }

  type Bid {
    bidder: String
    bidAmount: Float
    createdAt: Date
    itemId: Int
  }

  input BidInput {
    bidder: String
    bidAmount: Float                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    createdAt: Date
    itemId: Int
  }

  type Reaction {
    nftId: Int
    userAddress: String
  }

  type Query {
    users: [User!]!
    getUser(address: String): User
    getNftItems: [NftItem]
    getNftItem(nftIndex: String): NftItem
    getBids: [Bid]
    getReactions: [Reaction]
  }

  type Mutation {
    createUser(address: String, alias: String): User
    createNftItem(input: NftItemInput): NftItem
    updateNftItem(nftIndex: Int, input: NftItemInput): NftItem
    deleteNftItem(nftIndex: Int): NftItem
    createBid(input: BidInput): Bid
    updateBid(id: String, input: BidInput): Bid
    deleteBid(id: String): Bid
    createReaction(nftId: Int, userAddress: String): Reaction
    deleteReaction(nftId: Int, userAddress: String): Reaction
  }
`;

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value.getTime();
    },
    parseValue(value) {
      return new Date(value); // value from the client
    }
  }),
  Query: {
    users(_, args, context) {
      return context.db
        .collection('users')
        .find()
        .toArray()
    },
    getUser(_, { address }, context) {
      return context.db
        .collection('users')
        .findOne({ address })
    },
    getNftItems(_, args, context) {
      return context.db
        .collection('nftItems')
        .find()
        .toArray()
    },
    getNftItem(_, { nftAddress }, context) {
      return context.db
        .collection('nftItems')
        .findOne({ nftAddress })
    },
    getBids(_, args, context) {
      return context.db
        .collection('bids')
        .find()
        .toArray()
    },
    getReactions(_, args, context) {
      return context.db
        .collection('reactions')
        .find()
        .toArray()
    }
  },
  Mutation: {
    createUser(_, { address, alias }, context) {
      return context.db
        .collection('users')
        .insertOne({ address, alias })
        .then(result => result.insertedId)
    },
    createNftItem(_, { input }, context) {
      return context.db
        .collection('nftItems')
        .insertOne(input)
        .then(result => result.insertedId)
    },
    updateNftItem(_, { nftIndex, input }, context) {
      return context.db
        .collection('nftItems')
        .updateOne({ nftIndex }, { $set: input })
        .then(result => result.modifiedCount)
    },
    deleteNftItem(_, { nftIndex }, context) {
      return context.db
        .collection('nftItems')
        .deleteOne({ nftIndex })
        .then(result => result.deletedCount)
    },
    createBid(_, { input }, context) {
      return context.db
        .collection('bids')
        .insertOne(input)
        .then(result => result.insertedId)
    },
    updateBid(_, { id, input }, context) {
      return context.db
        .collection('bids')
        .updateOne({ id }, { $set: input })
        .then(result => result.modifiedCount)
    },
    deleteBid(_, { id }, context) {
      return context.db
        .collection('bids')
        .deleteOne({ id })
        .then(result => result.deletedCount)
    },
    createReaction(_, { nftId, userAddress }, context) {
      return context.db
        .collection('reactions')
        .insertOne({ nftId, userAddress })
        .then(result => result.insertedId)
    },
    deleteReaction(_, { nftId, userAddress }, context) {
      return context.db
        .collection('reactions')
        .deleteOne({ nftId, userAddress })
        .then(result => result.deletedCount)
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let db;

const apolloServer = new ApolloServer({
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  schema,
  context: async () => {
    if (!db) {
      const uri = process.env.MONGO_URL1 || 'mongodb://localhost:27017/graphql-playground';
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db();
    }
    return { db };
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};