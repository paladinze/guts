import { InjectionToken } from '@angular/core';
import { CustomModuleConfig } from '../comp.module';

export const token1 = new InjectionToken<string>('configA');
export const token2 = new InjectionToken<string>('configA');

export const CUSTOM_MODULE_CONFIG = new InjectionToken<CustomModuleConfig>('CUSTOM_MODULE_CONFIG');
