import { MqttClient } from 'mqtt';
interface Resp {
    data: any;
    time: number;
}
declare type RespSuccess = (resp: Resp) => void;
declare type RespParser = (resp: object) => any;
declare type RespFail = (error: Error) => void;
interface OriginRespCallback {
    onMessage: (resp: string) => void;
}
interface RespCallback {
    success: RespSuccess;
    fail: RespFail;
    parser: RespParser;
    startTime: number;
}
interface Config {
    hosts: Array<string>;
    token: string;
    userName: string;
    passWord: string;
}
interface Request {
    msgId: string;
    token: string;
    url: string;
    parameter: Map<string, any>;
    tiemOut: number;
    json: boolean;
    header: {
        uToken: string;
        msgId: string;
    };
}
declare class MyMQTT {
    protected client: MqttClient;
    protected config: Config;
    protected responseTopic: string;
    protected subscribedTopics: Map<string, OriginRespCallback>;
    protected callbackScratchStacks: Map<string, RespCallback>;
    protected msgIdAutoIncrement: number;
    _generateMsgId(): string;
    onError: (err: Error) => {};
    constructor(_config: Config);
    init(): Promise<unknown>;
    registerTopicHandle(topic: string): Promise<unknown>;
    request({ url, parameter, parser, json, tiemOut, uToken }: {
        url?: string;
        parameter?: Map<string, any>;
        parser?: RespParser;
        json?: boolean;
        tiemOut?: number;
        uToken?: string;
    }): Promise<unknown>;
    publish({ topic, message }: {
        topic?: string;
        message?: Request;
    }): void;
}
export { MyMQTT };
