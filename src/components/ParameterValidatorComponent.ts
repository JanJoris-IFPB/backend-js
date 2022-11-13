import LoggerComponent from "./LoggerComponent";

export default class ParameterValidatorComponent {

    private static logger = new LoggerComponent(ParameterValidatorComponent.name);

    /**
     * This method checks whether or not the parameters of the passed object are defined 
     * @param {any} object the object to validate the parameters of
     * @param {string[]} parameters the parameters to validate
     * @returns {boolean} true if all parameters are defined
     * @throws {Error} if any parameters are not defined
     */
    public static validateParameters(object: any, parameters: string[]): boolean {

        parameters.forEach((param) => {
            if (object[param] === undefined) {
                ParameterValidatorComponent.logger.warn(`Attribute value in object is undefined. Attribute: ${param}`, object);
                throw new Error(`Attribute value in object is undefined. Attribute: ${param}`);
            }
        });
        return true;
    }
}
