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
    const { component, row, evalContext, scope, path } = context;
    if (!shouldCalculate(context)) {
        return;
    }
    const evalContextValue = evalContext ? evalContext(context) : context;
    evalContextValue.value = null;
    if (!scope.calculated) scope.calculated = [];
    const newValue = Evaluator.evaluate(component.calculateValue, evalContextValue, 'value');
    scope.calculated.push({
        path,
        value: newValue
    });
    _set(row, component.key, newValue);
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
