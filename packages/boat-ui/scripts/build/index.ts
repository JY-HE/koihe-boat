import { series, parallel } from 'gulp';
import {
    clean,
    buildModules,
    buildFull,
    generateTypesTask,
    buildStyle,
    generateHelper,
} from './task';

export default series(
    clean,
    parallel(buildModules, buildFull, buildStyle, generateTypesTask, generateHelper)
);
