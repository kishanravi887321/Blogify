import {createClient} from "redis";
const redisClient=createClient();

redisClient.on("error" ,(error)=>console.error("Redis error",error));

export default redisClient;

