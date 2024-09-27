import { getFunctionDescriptionsFromHtml } from '@/cli/commands/GenerateTypes/fn/getFunctionDescriptionsFromHtml.js';

describe('getFunctionDescriptionsFromHtml', () => {
    it('should get all function descriptions', () => {
        const html = `<div id="f-functionOne">
<div class="title">functionOne(a, b)</div>
</div>
<div id="f-functionTwo">
<div class="title">functionTwo(a, [b, [c]])</div>
</div>`;

        const result = getFunctionDescriptionsFromHtml(html, '1.0.0');

        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('functionOne');
        expect(result[1].name).toBe('functionTwo');
        expect(result[1].parameters).toHaveLength(3);
        expect(result[1].parameters[0].name).toBe('a');
        expect(result[1].parameters[0].required).toBe(true);
        expect(result[1].parameters[1].name).toBe('b');
        expect(result[1].parameters[1].required).toBe(false);
        expect(result[1].parameters[2].name).toBe('c');
        expect(result[1].parameters[2].required).toBe(false);
    });

    it('should get multiple function descriptions in the same element', () => {
        const html = `<div id="f-namespace.function">
<div class="title">some.namespace.function(a, b, c) <br> some.namespace.function(d, e) <br> some.namespace.function(f)</div>
</div>`;

        const result = getFunctionDescriptionsFromHtml(html, '1.0.0');

        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('function');
        expect(result[0].parameters).toHaveLength(3);
        expect(result[1].name).toBe('function');
        expect(result[1].parameters).toHaveLength(2);
        expect(result[2].name).toBe('function');
        expect(result[2].parameters).toHaveLength(1);
    });
});
