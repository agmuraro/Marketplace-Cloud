import { ServiceBusClient } from "@azure/service-bus";

export class ServiceBusService {
    private client: ServiceBusClient;
    private sender;

    constructor() {
        const connectionString = process.env.AZURE_SERVICE_BUS_KEY;
        this.client = new ServiceBusClient(connectionString);
        this.sender = this.client.createSender("filaproduto");
    }

    async sendMessage(message: string) {
        await this.sender.sendMessages({ body: message });
        console.log("Mensagem enviada para o Service Bus");
    }
    
    async close() {
        await this.sender.close();
        await this.client.close();
    }
}