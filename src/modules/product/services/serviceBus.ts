import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";

export class ServiceBusService {
    private client: ServiceBusClient;
    private senders: { [key: string]: ServiceBusSender };

    constructor() {
        const connectionString = process.env.AZURE_SERVICE_BUS_KEY;
        this.client = new ServiceBusClient(connectionString);

        // Inicialize senders para cada fila
        this.senders = {
            filaproduto: this.client.createSender("filaproduto"),
            filaget: this.client.createSender("filaget"),
            filaput: this.client.createSender("filaput"),
            filadelete: this.client.createSender("filadelete"),
        };
    }

    private getQueueNameByAction(action: string): string {
        switch (action.toLowerCase()) {
            case "create":
                return "filaproduto";
            case "findmany":
                return "filaget";
            case "update":
                return "filaput";
            case "delete":
                return "filadelete";
            default:
                throw new Error(`Ação ${action} não suportada.`);
        }
    }

    async sendMessage(action: string, data: any) {
        const queueName = this.getQueueNameByAction(action);
        const sender = this.senders[queueName];

        await sender.sendMessages({
            body: { action, ...data }
        });
        console.log(`Mensagem enviada para o Service Bus na fila ${queueName} com ação: ${action}`);
    }

    async close() {
        for (const sender of Object.values(this.senders)) {
            await sender.close();
        }
        await this.client.close();
    }
}