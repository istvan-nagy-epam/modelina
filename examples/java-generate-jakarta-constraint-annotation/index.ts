import { JavaGenerator, JAVA_CONSTRAINTS_PRESET } from '../../src';

const generator = new JavaGenerator({
  collectionType: 'List',
  presets: [
    {
      preset: JAVA_CONSTRAINTS_PRESET,
      options: {
        importFrom: 'jakarta'
      }
    }
  ]
});
const jsonSchemaDraft7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'Person',
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    age: { type: 'number' },
    website: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        url: { type: 'string', format: 'uri' }
      },
      required: ['name', 'url'],
      additionalProperties: false
    },
    home_address: {
      $ref: '#/components/schemas/Address'
    },
    work_addresses: {
      type: 'array',
      items: { $ref: '#/components/schemas/Address' },
      minItems: 1,
      maxItems: 5
    }
  },
  required: ['first_name', 'last_name', 'age', 'home_address'],
  additionalProperties: false,
  components: {
    schemas: {
      Address: {
        $id: 'Address',
        type: 'object',
        properties: {
          street_address: {
            type: 'string'
          },
          city: {
            type: 'string'
          },
          state: {
            type: 'string'
          }
        },
        required: ['street_address', 'city'],
        additionalProperties: false
      }
    }
  }

};

export async function generate(): Promise<void> {
  const models = await generator.generate(jsonSchemaDraft7);
  for (const model of models) {
    console.log(model.result);
  }
}
if (require.main === module) {
  generate();
}
