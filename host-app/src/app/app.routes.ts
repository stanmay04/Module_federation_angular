// app.routes.ts
import { Routes } from '@angular/router';

function waitForRemoteContainer(): Promise<any> {
  return new Promise((resolve) => {
    if (window.remote_app) return resolve(window.remote_app);
    const interval = setInterval(() => {
      if (window.remote_app) {
        clearInterval(interval);
        resolve(window.remote_app);
      }
    }, 100);
  });
}

export const routes: Routes = [
  {
    path: 'remote',
    loadChildren: async () => {
      const container = await waitForRemoteContainer();
      if (!container) {
        throw new Error('Remote container (window.remote_app) is not defined.');
      }
      try {
        await container.init(__webpack_share_scopes__.default);
      } catch (e) {
        console.warn('Container already initialized or error during init:', e);
      }
      const remoteModuleFactory = await container.get("./RemoteModule");
      // If remoteModuleFactory is a function, call it:
      const moduleOrFactory = typeof remoteModuleFactory === 'function'
        ? remoteModuleFactory()
        : remoteModuleFactory;
      // If it's wrapped in an object, extract the named export
      if (moduleOrFactory && moduleOrFactory.RemoteModule) {
        return moduleOrFactory.RemoteModule;
      }
      return moduleOrFactory;
    }
  }
];
