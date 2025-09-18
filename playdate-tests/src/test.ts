import { runTests } from '../../libs/test/src/import';

// @crankscript-test-imports-start
import './constants.test.ts';
import './class/abstract-fields.test.ts';
import './class/class-basics.test.ts';
import './class/class-constructors.test.ts';
import './class/class-methods.test.ts';
import './class/class-properties.test.ts';
// @crankscript-test-imports-end

runTests();
