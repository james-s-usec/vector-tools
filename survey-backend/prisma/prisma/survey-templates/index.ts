// Export all survey templates
import { ahuSurvey } from './ahu-survey';
import { boilerSurvey } from './boiler-survey';
import { chillerSurvey } from './chiller-survey';
import { pumpSurvey } from './pump-survey';
import { controlsSurvey } from './controls-survey';
import { exhaustFanSurvey } from './exhaust-fan-survey';
import { rtuSurvey } from './rtu-survey';
import { zoneTerminalSurvey } from './zone-terminal-survey';
import { lightingSurvey } from './lighting-survey';
import { equipmentSummariesSurvey } from './equipment-summaries-survey';
import { buildingInformationSurvey } from './building-information-survey';

// Export array of all survey templates
export const surveyTemplates = [
  ahuSurvey,
  boilerSurvey,
  chillerSurvey,
  pumpSurvey,
  controlsSurvey,
  exhaustFanSurvey,
  rtuSurvey,
  zoneTerminalSurvey,
  lightingSurvey,
  equipmentSummariesSurvey,
  buildingInformationSurvey
];

// Export individual templates
export {
  ahuSurvey,
  boilerSurvey,
  chillerSurvey,
  pumpSurvey,
  controlsSurvey,
  exhaustFanSurvey,
  rtuSurvey,
  zoneTerminalSurvey,
  lightingSurvey,
  equipmentSummariesSurvey,
  buildingInformationSurvey
};