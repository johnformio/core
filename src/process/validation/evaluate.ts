import { Component, ComponentInstances, DataObject, ProcessorFn, ProcessorFnSync, ProcessorInfo, ValidationContext, ValidationRuleInfo, ValidationScope } from "types";
import { EvaluationRules } from "./rules/evaluationRules";
import { FieldError } from "error";
import { validator, validatorSync } from "./validate";
import { validateProcess, validateProcessSync } from "./validateProcess";
import { shouldValidate } from "./util";

// Perform a validation on a form asynchonously.
export async function validate(components: Component[], data: DataObject, instances?: ComponentInstances): Promise<FieldError[]> {
    return validator(EvaluationRules)(components, data, instances);
}

// Perform a validation on a form synchronously.
export function validateSync(components: Component[], data: DataObject, instances?: ComponentInstances): FieldError[] {
    return validatorSync(EvaluationRules)(components, data, instances);
}

export const validateCustomProcess: ProcessorFn<ValidationScope> = async (context: ValidationContext) => {
    context.scope.rules = EvaluationRules;
    return validateProcess(context);
};

export const validateCustomProcessSync: ProcessorFnSync<ValidationScope> = (context: ValidationContext) => {
    context.scope.rules = EvaluationRules;
    return validateProcessSync(context);
};

export const validateServerProcessInfo: ProcessorInfo<ValidationContext, void> = {
    name: 'validateCustom',
    process: validateCustomProcess,
    processSync: validateCustomProcessSync,
    shouldProcess: shouldValidate,
};

export * from './util';