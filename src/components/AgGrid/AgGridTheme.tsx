import {
  ModuleRegistry,
  ColumnAutoSizeModule,
  ColumnHoverModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  QuickFilterModule,
  TextEditorModule,
  LargeTextEditorModule,
  SelectEditorModule,
  NumberEditorModule,
  DateEditorModule,
  CheckboxEditorModule,
  LocaleModule,
  ClientSideRowModelModule,
  colorSchemeDark,
  themeQuartz
} from 'ag-grid-community'

ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnHoverModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  QuickFilterModule,
  TextEditorModule,
  LargeTextEditorModule,
  SelectEditorModule,
  NumberEditorModule,
  DateEditorModule,
  CheckboxEditorModule,
  LocaleModule,
  ClientSideRowModelModule
])

const AgGridTheme = themeQuartz.withPart(colorSchemeDark)
export default AgGridTheme

import { AG_GRID_LOCALE_EN } from '@ag-grid-community/locale'

export const AgGridLocales = {
  en: { AG_GRID_LOCALE_EN }
}
