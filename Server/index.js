const express= require("express")
const {ApolloServer}=require("@apollo/server")
const { expressMiddleware} = require("@apollo/server/express4")
const bodyparser=require("body-parser")
const cors = require("cors")
const { default: axios } = require("axios")

const { USERS } = require("./user");
const { TODOS } = require("./todo");


async function startServer(){
    const app = express();
    const server=new ApolloServer({
        typeDefs:`
        type user {
            id:ID!
            name:String! 
            username:String! 
            email:String! 
            website:String! 

        }
        type Todo {
          id:ID!  
          title:String! 
          completed:Boolean! 
          user:user
        }
        type Query {
            getTodos:[Todo]
            getallUser:[user]
            getuser(id:ID!):user
        }
        `,
        resolvers: {
            Todo: {
              user: (todo) => USERS.find((e) => e.id === todo.id),
            },
            Query: {
              getTodos: () => TODOS,
              getallUser: () => USERS,
              getuser: async (parent, { id }) => USERS.find((e) => e.id === id),
            },
          },
        });
    app.use(bodyparser.json());
    app.use(cors());
    await server.start()
    
    app.use("/graphql",expressMiddleware(server));
    app.listen(8000,()=>console.log('server started Yippe'));

}
startServer();