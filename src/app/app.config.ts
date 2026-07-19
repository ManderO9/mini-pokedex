import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideLottieOptions } from "ngx-lottie";
import { provideEchartsCore } from "ngx-echarts";
import * as echarts from "echarts/core";
import { LineChart, RadarChart } from "echarts/charts";
import {
GridComponent,
TooltipComponent,
LegendComponent,
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";

echarts.use([
LineChart,
GridComponent,
TooltipComponent,
LegendComponent,
CanvasRenderer,
RadarChart
]);


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideLottieOptions({ player: () => import("lottie-web") }),
    provideEchartsCore({ echarts })
  ]
};

