export function AutoBind(_1: any, _2: string, desc: PropertyDescriptor){
    const orgMethod = desc.value;
    const adjMethod: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return orgMethod.bind(this);
        }
    };
    return adjMethod;
}