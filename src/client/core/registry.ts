interface ServiceProxy {
  instance: any;
  ctor: new (registry: Registry) => any;
}

export class Registry {
  private services: {[name: string]: ServiceProxy} = {};
  private constants: {[key: string]: string} = {};
  private stack: Set<string> = new Set<string>();

  public constant(key: string, item: string): this {
    this.constants[key] = item;
    return this;
  }

  public getConstant(key: string): string {
    return this.constants[key];
  }

  public service(name: string, ctor: ServiceProxy['ctor']): this {
    if (this.services[name]) {
      throw new Error(`Service ${name} already registered`);
    }
    this.services[name] = {
      instance: null,
      ctor
    };
    return this;
  }

  public getService<T>(name: string): T {
    if (this.stack.has(name)) {
      throw new Error(`Circular dependency detected when resolving ${name}`);
    }
    const proxy = this.services[name];
    if (!proxy) {
      throw new Error(`Service ${name} not registered`);
    }
    if (!proxy.instance) {
      this.stack.add(name);
      proxy.instance = new proxy.ctor(this);
      this.stack.delete(name);
    }
    return proxy.instance as T;
  }
}