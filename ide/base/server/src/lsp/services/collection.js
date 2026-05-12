"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = void 0;
/**
 * Represents a collection of services
 */
class ServiceManager {
    /** @inheritdoc */
    name = 'ServiceManager';
    logger;
    services;
    constructor(logger) {
        this.logger = logger.withPrefix('[service manager]');
        this.services = [];
    }
    /**
     * Adds a service to the collection
     * @param service The service to add
     */
    add(...services) {
        services.forEach((s) => {
            this.logger.info(`Adding service ${s.name}`);
            this.services.push(s);
        });
        return this;
    }
    /** @inheritdoc */
    dispose() {
        this.services.forEach((service) => {
            if (service.dispose) {
                this.logger.info(`Disposing service ${service.name}`);
                service.dispose();
            }
        });
    }
    /** @inheritdoc */
    onInitialize(capabilities, params, token, workDoneProgress) {
        const max = this.services.length;
        this.services.forEach((service, index) => {
            if (token?.isCancellationRequested)
                return;
            if (service.onInitialize) {
                workDoneProgress?.report(index / max, service.name);
                this.logger.info(`Initializing service ${service.name}`);
                service.onInitialize(capabilities, params);
            }
        });
    }
    /** @inheritdoc */
    setupHandlers(connection) {
        this.services.forEach((service) => {
            if (service.setupHandlers) {
                this.logger.info(`setup handlers ${service.name}`);
                service.setupHandlers(connection);
            }
        });
    }
    /** @inheritdoc */
    dynamicRegister(register) {
        this.services.forEach((service) => {
            if (service.dynamicRegister) {
                this.logger.info(`Registering service ${service.name}`);
                service.dynamicRegister(register);
            }
        });
    }
    /** @inheritdoc */
    async start() {
        for (const service of this.services) {
            if (service.start) {
                this.logger.info(`Starting service ${service.name}`);
                await service.start();
            }
        }
    }
    /** @inheritdoc */
    stop() {
        this.services.forEach((service) => {
            if (service.stop) {
                this.logger.info(`Stopping service ${service.name}`);
                service.stop();
            }
        });
    }
    service(constructor) {
        for (const s of this.services) {
            if (s instanceof constructor) {
                return s;
            }
        }
        return undefined;
    }
}
exports.ServiceManager = ServiceManager;
//# sourceMappingURL=collection.js.map