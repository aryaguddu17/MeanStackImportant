import { NgModule } from '@angular/core';
import { KeepHtml } from './Pipes/keepHtml.Pipes';
import {IntToFloat} from './Pipes/custom.Pipes';
import { GeoLocationCommonComponent } from './Pages/GeoLocationCommon/geo-location-common.component';
@NgModule({
  // imports: [,
  // ],
  declarations: [  
    KeepHtml,
    IntToFloat,
    GeoLocationCommonComponent
  ],
   exports: [
    KeepHtml,
    IntToFloat,
    GeoLocationCommonComponent
  ],
  // providers: [    
  // ],

})
export class SharedModule {}

