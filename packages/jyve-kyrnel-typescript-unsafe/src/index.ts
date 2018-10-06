// tslint:disable-next-line
/// <reference path="../../../node_modules/@types/webpack-env/index.d.ts"/>

import {Kernel} from '@jupyterlab/services';
import {Jyve} from '@deathbeds/jyve';
import {JyveKernel} from '@deathbeds/jyve/lib/kernel';

import * as KernelModuleType from './kernel';

// tslint:disable-next-line
export const {jyve} = require('../package.json') as any;

export const kernelSpec: Kernel.ISpecModel = jyve.kernelspec;

export async function newKernel(
  options: JyveKernel.IOptions,
  id: string
): Promise<Jyve.IJyveKernel> {
  let kernel = await new Promise<typeof KernelModuleType>((resolve, reject) => {
    require.ensure(
      ['./kernel'],
      (require) => {
        const kernel = require('./kernel') as typeof KernelModuleType;
        resolve(kernel);
      },
      (error: any) => {
        console.error(error);
        reject();
      },
      'typescript'
    );
  });
  return new kernel.TypeScriptUnsafeKernel(options, id);
}
