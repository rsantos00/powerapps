/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    ImageBase64: ComponentFramework.PropertyTypes.StringProperty;
    height: ComponentFramework.PropertyTypes.StringProperty;
    width: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    ImageBase64?: string;
    height?: string;
    width?: string;
    ResultMessage?: string;
}
