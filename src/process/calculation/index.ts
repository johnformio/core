import JSONLogic from 'modules/jsonlogic';
import { ProcessorFn, ProcessorFnSync, CalculationScope, CalculationContext, ProcessorInfo } from 'types';
import _set from 'lodash/set';
const Evaluator = JSONLogic.evaluator;

export const shouldCalculate = (context: CalculationContext): boolean => {
    const { component } = context;
    if (!component.calculateValue || (component.hasOwnProperty('calculateServer') && !component.calculateServer)) {
        return false;
    }
    return true;
};

export const calculateProcessSync: ProcessorFnSync<CalculationScope> = (context: CalculationContext) => {
    const { component, row, evalContext } = context;
    if (!shouldCalculate(context)) {
        return;
    }
    const evalContextValue = evalContext ? evalContext(context) : context;
    _set(row, component.key, Evaluator.evaluate(component.calculateValue, evalContextValue, 'value'));
    return;
};

export const calculateProcess: ProcessorFn<CalculationScope> = async (context: CalculationContext) => {
    return calculateProcessSync(context);
};

export const calculateProcessInfo: ProcessorInfo<CalculationContext, void> = {
    name: 'calculate',
    process: calculateProcess,
    processSync: calculateProcessSync,
    shouldProcess: shouldCalculate,
};
