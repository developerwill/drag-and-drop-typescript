namespace App {
    /**
     *
     * @param _ // Tells TS that we know we aren't using this parameter but
     *             still need him to be there in order to access the descriptor parameter
     * @param _2 // Same as the above
     * @param descriptor // Gets the original method, so we can bind the "this" that will
     *                      refer to the "this" of the Class, after that we can access
     *                      the Class properties values
     */
    export function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjustedDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                return originalMethod.bind(this);
            },
        };
        return adjustedDescriptor;
    }
}