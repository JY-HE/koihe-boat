import { series, parallel } from 'gulp';
import { clean, buildModules, buildFull, generateTypes, buildStyle, generateHelper } from './task';

export default series(
    clean,
    parallel(buildModules, buildFull, buildStyle, generateTypes, generateHelper)
);
