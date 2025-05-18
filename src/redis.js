import {createClient} from "redis";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})

const redis_url=process.env.REDIS_URL;
console.log(redis_url)
const redisClient=createClient({
    url:redis_url
});

redisClient.on("error" ,(error)=>console.error("Redis error",error));

export default redisClient;

