import { Redis, RedisOptions } from "ioredis";

export class RedisConnection {
    public static instance: RedisConnection;
    private client?: Redis;
    constructor(){}

    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisConnection();
        }
        return this.instance;
    }

    public async connect(config: RedisOptions){
        if(this.client){
            await this.disconnect();
        }

        this.client = new Redis({ ...config, lazyConnect: true });
        await this.client.connect();
    }
    
    public getClient(){
        if(!this.client){
            throw new Error("Redis db not connected.");
        }
        return this.client;
    }

    public async disconnect(): Promise<void>{
        if(this.client){
            await this.client.quit();
            this.client = undefined;
        }
    }
}