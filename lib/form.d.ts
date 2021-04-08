import { Formio } from './Formio';
/**
 * Register a specific plugin.
 *
 * @param key
 * @param plugin
 * @returns
 */
export declare function usePlugin(key: string, plugin: any): void;
/**
 * Register a new module.
 *
 * @param module
 * @returns
 */
export declare function useModule(module: any): void;
/**
* Allows passing in plugins as multiple arguments or an array of plugins.
*
* Formio.plugins(plugin1, plugin2, etc);
* Formio.plugins([plugin1, plugin2, etc]);
*/
export declare function use(...mods: any): void;
import modules from './modules';
export { Formio };
export { modules };
export * from './model';
export * from './core';
export * from './components';
